# Task Management Engine
A Full-Stack Reactive Task Orchestrator
Angular 21 | .NET 10 | PostgreSQL | Azure

[Live Demo](https://red-forest-0dee89c1e.1.azurestaticapps.net/)

🛠 Tech Stack

Frontend
- Framework: Angular 21 (Signals-based architecture)
- Styling: Tailwind CSS / SCSS
- State: Signals & Signal-based Effects
- Testing: Playwright (End-to-End)

Backend
- Server: ASP.NET Core 10
- ORM: Entity Framework Core
- Database: PostgreSQL
- Querying: LINQ with Deferred Execution

Prerequisites
- .NET 10 SDK
- Node.js (v20+)
- npm

Installation
1. Clone the repo

```Bash
git clone https://github.com/JeSarasua/task-management-engine.git
```

2. Setup Backend
```Bash
cd Backend
dotnet restore
dotnet run
```

3. Setup Frontend
```Bash
cd Frontend
pnpm install
pnpm start
```


To deploy to azure

Backend

```ps1
dotnet publish -c Release -o ./publish
Compress-Archive -Path ./publish/* -DestinationPath ./publish.zip -Force
az webapp deploy --resource-group todoapp-rg --name todo-backend-api --src-path ./publish.zip
```

Frontend

```ps1
ng build --configuration production
swa deploy ./dist/todo-angular/browser --deployment-token $token --env production
```
