$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$backupDir = ".\backups"

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

docker exec sentit-postgres-1 pg_dump -U postgres -d sentit > "$backupDir\sentit_$timestamp.sql"

Write-Host "Backup created: $backupDir\sentit_$timestamp.sql"

$backups = Get-ChildItem $backupDir -Filter "sentit_*.sql" |
    Sort-Object LastWriteTime -Descending

if ($backups.Count -gt 7) {
    $backups | Select-Object -Skip 7 | Remove-Item -Force
}

Write-Host "Backup cleanup complete. Keeping latest 7 backups."