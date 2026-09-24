from fastapi import FastAPI, APIRouter

app = FastAPI()
router_url = APIRouter(prefix="/api")

@app.get("/")
async def server_up():
    return {"mensaje":"Servicio de API activo"}

@router_url.post("/checkout", tags=["Alquiler peliculas"])
async def checkout():
    pass

@router_url.get("/inventory", tags=["Inventario"])
async def inventory():
    pass

app.include_router(router_url)

"""
IN
rental
rental_date auto sys
inventory_id
customer_id input user
staff_id input user

payment
rental_id last sys
amount input user
payment_date auto sys

GET
inventory
inventory_id
film_id

film
film_id
title
"""