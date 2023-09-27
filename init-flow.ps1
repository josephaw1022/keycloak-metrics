function print {
    param(
        [string]$message
    )
    Write-Host $message
}


# Create an docker network for the containers to communicate with each other
$dockerNetworkCreationCommand = "docker network create keycloak-metrics-network"

print "Creating docker network for containers to communicate with each other..."

# Create the docker network
Invoke-Expression $dockerNetworkCreationCommand

print "Docker network created successfully."






# Run the init-db.ps1 script
.\sql-server\init-db.ps1


$timeToWait = 5

print "Keycloak database created successfully. Now waiting ${timeToWait} seconds for the database to be created..."

# wait for db to be created
Start-Sleep -Seconds $timeToWait

print "Starting Keycloak..."

# Docker compose up command for Keycloak
$initialKeycloakDockerCommand = "docker compose up keycloak -d "

print "Keycloak started successfully."

# Start Keycloak
Invoke-Expression $initialKeycloakDockerCommand