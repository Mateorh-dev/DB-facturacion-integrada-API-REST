from fastapi import FastAPI, APIRouter

app = FastAPI()
router_url = APIRouter(prefix="/api")

@app.get("/")
async def server_up():
    return {"mensaje":"Servicio de API activo"}

@router_url.post("/checkout", tags=["Alquiler peliculas"])
async def checkout():
    pass

app.include_router(router_url)