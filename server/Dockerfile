# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY *.csproj ./
RUN dotnet restore
COPY . ./

# Install the dotnet-ef global tool
# RUN dotnet tool install --global dotnet-ef --version 9.0.*
# ENV PATH="$PATH:/root/.dotnet/tools"

# --- IMPORTANT CHANGE HERE ---
# Instead of relying on appsettings.json, pass the connection string directly.
# Get the connection string from an ARG (build argument)
# ARG DB_CONNECTION_STRING

# Now run your migrations, using the ARG as the connection string
# RUN dotnet ef database update --project . 
# --connection "${DB_CONNECTION_STRING}"

# Publish your application
RUN dotnet publish -c Release -o /app/out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENV ASPNETCORE_URLS=http://+:5062
EXPOSE 5062
ENTRYPOINT ["dotnet", "user-management-app.dll"]