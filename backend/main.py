from fastapi import FastAPI
from routers import logs, alerts, incidents, rules

app = FastAPI()

app.include_router(logs.router)
app.include_router(alerts.router)
app.include_router(incidents.router)
app.include_router(rules.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI application"}