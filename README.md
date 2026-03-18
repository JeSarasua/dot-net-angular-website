# dot-net-angular-website

To deploy to azure

Backend

```text
dotnet publish -c Release -o ./publish
Compress-Archive -Path ./publish/* -DestinationPath ./publish.zip -Force
az webapp deploy --resource-group todoapp-rg --name todo-backend-api --src-path ./publish.zip
```

Frontend

```text
ng build --configuration production
swa deploy ./dist/todo-angular/browser --deployment-token $token --env production
```
