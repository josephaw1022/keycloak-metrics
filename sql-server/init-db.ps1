function print {
    param(
        [string]$message
    )
    Write-Host $message
}


# Docker compose up command for SQL Server
$initialSqlDockerCommand = "docker compose up mssql -d "


print "Starting SQL Server..."

# Start SQL Server
Invoke-Expression $initialSqlDockerCommand


print "Waiting for SQL Server to start..."

# wait for sql server to start
Start-Sleep -Seconds 10


print "Creating Keycloak database..."

# Load the .NET assembly for SQL Server
Add-Type -AssemblyName "System.Data.SqlClient"

# SQL Server connection string
$connectionString = "Server=localhost,1433;Database=master;User Id=SA;Password=RunningMan323#;Integrated Security=false; MultipleActiveResultSets=true; Encrypt=False; TrustServerCertificate=True; Connection Timeout=30;"

# Create SQL connection
$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString

# SQL query to create the Keycloak database
$query = @"
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Keycloak')
BEGIN
    CREATE DATABASE keycloak
END
"@


# Create SQL command
$command = $connection.CreateCommand()
$command.CommandText = $query

try {
    # Open the connection
    $connection.Open()

    # Execute the query
    $command.ExecuteNonQuery()

    Write-Host "Database Keycloak created successfully."
}
catch {
    Write-Host "Error occurred:"
    Write-Host $_.Exception.Message
}
finally {
    # Close the connection
    $connection.Close()
}
