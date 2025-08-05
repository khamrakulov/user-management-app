# Development stage for hot-reloading
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS development

WORKDIR /app

# Copy just the .csproj file first to leverage Docker's build cache.
# If only the .csproj changes, dotnet restore will re-run.
COPY *.csproj ./
RUN dotnet restore

# No need to COPY the entire source code here, as it will be mounted via volume in docker-compose.yml.
# The 'dotnet watch run' command will pick up changes from the mounted volume.

# Expose the internal port the ASP.NET Core application will listen on
EXPOSE 5062

# Set the ASP.NET Core URLs to listen on all interfaces within the container
ENV ASPNETCORE_URLS=http://+:5062

# Define the entry point for the container to run the app with hot-reloading
ENTRYPOINT ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5062"]
