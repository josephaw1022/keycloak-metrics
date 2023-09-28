import { Injectable, NotImplementedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

// Interfaces
export interface IRowPerTable {
  tableName: string;
  rows: number;
}

export interface IUserAttribute {
  userID: string;
  username: string;
  attributeName?: string;
  value?: string;
}

export interface IClient {
  id: string;
  clientId: string;
  name?: string;
  protocol?: string;
}

export interface IUserRole {
  username: string;
  roleName: string;
}

export interface IGroupMember {
  groupName: string;
  username: string;
}

export interface IClientRole {
  clientId: string;
  name?: string;
  roleName?: string;
}

export interface IUserSession {
  username: string;
  startTimestamp: Date;
  lastSessionRefresh: Date;
}

export interface IClientSession {
  clientId: string;
  userId: string;
  startTimestamp: Date;
}

export interface ClientDefaultRole {
  clientId: string;
  roleName: string;
}

export interface RoleMapping {
  userId: string;
  roleId: string;
  clientId: string;
}

// Service
@Injectable()
export class KeycloakMetricService {
  constructor(
    @InjectDataSource('key-cloak-db')
    private readonly keyCloakDataSource: DataSource
  ) {}

  public async rowsPerTable(): Promise<IRowPerTable[]> {
    const query = `
      SELECT t.NAME AS tableName, p.rows AS rows
      FROM sys.tables t
      INNER JOIN sys.indexes i ON t.OBJECT_ID = i.object_id
      INNER JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
      WHERE i.index_id <= 1 AND t.is_ms_shipped = 0
      ORDER BY p.rows DESC, t.Name ASC;
    `;

    return this.keyCloakDataSource.query(query) as Promise<IRowPerTable[]>;
  }

  public async fetchUsersAndTheirAttributes(): Promise<IUserAttribute[]> {
    const query = `
      SELECT u.ID AS userID, u.USERNAME as username, ua.NAME as attributeName, ua.VALUE as value
      FROM USER_ENTITY u
      LEFT JOIN USER_ATTRIBUTE ua ON u.ID = ua.USER_ID;
    `;

    return this.keyCloakDataSource.query(query) as Promise<IUserAttribute[]>;
  }

  public async fetchClients(): Promise<IClient[]> {
    const query = `SELECT ID as id, CLIENT_ID as clientId, NAME as name, PROTOCOL as protocol FROM CLIENT;`;
    return this.keyCloakDataSource.query(query) as Promise<IClient[]>;
  }

  public async fetchUserRoles(): Promise<IUserRole[]> {
    const query = `
      SELECT u.USERNAME as username, r.NAME as roleName
      FROM USER_ENTITY u
      JOIN USER_ROLE_MAPPING urm ON u.ID = urm.USER_ID
      JOIN ROLE r ON urm.ROLE_ID = r.ID;
    `;

    return this.keyCloakDataSource.query(query) as Promise<IUserRole[]>;
  }

  public async fetchGroupsAndMembers(): Promise<IGroupMember[]> {
    const query = `
      SELECT g.NAME as groupName, u.USERNAME as username
      FROM USER_ENTITY u
      JOIN USER_GROUP_MAPPING ug ON u.ID = ug.USER_ID
      JOIN GROUP_ENTITY g ON ug.GROUP_ID = g.ID;
    `;

    return this.keyCloakDataSource.query(query) as Promise<IGroupMember[]>;
  }

  public async fetchClientRoles(): Promise<IClientRole[]> {
    const query = `
      SELECT c.CLIENT_ID as clientId, c.NAME as name, r.NAME as roleName
      FROM CLIENT c
      JOIN CLIENT_ROLE r ON c.ID = r.CLIENT;
    `;

    return this.keyCloakDataSource.query(query) as Promise<IClientRole[]>;
  }

  public async fetchUserSessions(): Promise<IUserSession[]> {
    const query = `
      SELECT u.USERNAME as username, s.START_TIMESTAMP as startTimestamp, s.LAST_SESSION_REFRESH as lastSessionRefresh
      FROM USER_ENTITY u
      JOIN USER_SESSION s ON u.ID = s.USER_ID;
    `;

    return this.keyCloakDataSource.query(query) as Promise<IUserSession[]>;
  }

  public async fetchClientSessions(): Promise<IClientSession[]> {
    const query = `
      SELECT c.CLIENT_ID as clientId, s.USER_ID as userId, s.START_TIMESTAMP as startTimestamp
      FROM CLIENT c
      JOIN CLIENT_SESSION s ON c.ID = s.CLIENT_ID;
    `;

    return this.keyCloakDataSource.query(query) as Promise<IClientSession[]>;
  }

  /**
   * Fetches the default roles assigned to clients in Keycloak.
   * @returns {Promise<ClientDefaultRole[]>} - Returns an array of client default roles.
   */
  async fetchClientDefaultRoles(): Promise<ClientDefaultRole[]> {
    throw new NotImplementedException();
    // try {
    //   const query = `
    //     SELECT client_id, role_name
    //     FROM client_default_roles;
    //   `; // Replace with the actual SQL query or equivalent

    //   const result = await this.keyCloakDataSource.query(query); // Replace with the actual method to interact with your data source

    //   // Assuming result is an array of objects conforming to ClientDefaultRole interface
    //   return result.map((row) => ({
    //     clientId: row.client_id,
    //     roleName: row.role_name,
    //   }));
    // } catch (error) {
    //   console.error('Error fetching client default roles:', error);
    //   throw error;
    // }
  }

  /**
   * Fetches the role mappings present in Keycloak.
   * @returns {Promise<RoleMapping[]>} - Returns an array of role mappings.
   */
  async fetchRoleMappings()  {
    throw new NotImplementedException();
  }
}
