# Project Overview
This project focuses on enhancing the user experience with Keycloak by offering insights and visualizations into the underlying processes and data without requiring manual debugging or monitoring. By utilizing a suite of services and technologies such as Grafana and Budibase, we not only reduce the cognitive load but also boost productivity, providing a convenient means to monitor and interact with the application and its associated data.

## Setup Instructions
Execute the PowerShell script init-flow.ps1 to initialize the setup process.
Once the script has finished running, execute docker compose up -d to start the associated services in detached mode.
shell


### Initialize the setup


```
.\init-flow.ps1
```

### Start the services

```
docker compose up -d
```


## Components Overview

### Keycloak
Serves as the authentication system, managing user access and identities.

### SQL Server
Hosts the Microsoft SQL database, storing data pertaining to the Keycloak component.

### Budibase
Offers a convenient means to visualize the tables created in SQL Server by Keycloak without the necessity for SSMS or Data Studio.

### Metric Exporter
Extracts metrics from the database and generates a Prometheus-compatible file containing these metrics.

### Prometheus
Collects and stores metrics by scraping the Metric Exporter.

### Grafana
Visualizes the data stored in Prometheus, providing an intuitive interface for data analysis and monitoring.

# Objective
The integration of these components aims to provide a more insightful and enriched experience with Keycloak. This setup allows for effortless monitoring and periodic checks, offering insights without the need to manually run and debug the application. By utilizing Grafana for visualizing important metrics and Budibase for easy table visualization, this solution aims to reduce complexity and elevate productivity.

# Benefit
Having visual representation and insights at a glance not only makes it easier to understand what is happening but is also intriguing to monitor occasionally for various reasons. This intuitive monitoring solution thus alleviates the need for manual intervention and detailed scrutiny, allowing users to focus on more pressing tasks.