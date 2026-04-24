FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
# clang is the native linker required by .NET AOT on Linux.
# zlib1g-dev provides the zlib headers the linker needs.
RUN apt-get update && apt-get install -y --no-install-recommends clang zlib1g-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY JPSports.Api.csproj packages.lock.json ./
RUN dotnet restore
COPY . ./
RUN dotnet publish JPSports.Api.csproj -c Release -o /app

# runtime-deps contains only the OS libraries an AOT binary needs (glibc etc.)
# — no .NET runtime, so the image is much smaller than aspnet or runtime.
FROM mcr.microsoft.com/dotnet/runtime-deps:10.0
WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ARG APP_UID=1654
USER $APP_UID
ENTRYPOINT ["./JPSports.Api"]
