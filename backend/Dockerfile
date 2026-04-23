FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY JPSports.Api.csproj packages.lock.json ./
RUN dotnet restore
COPY . ./
RUN dotnet publish JPSports.Api.csproj -c Release -o /app /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ARG APP_UID=1654
USER $APP_UID
ENTRYPOINT ["dotnet", "JPSports.Api.dll"]
