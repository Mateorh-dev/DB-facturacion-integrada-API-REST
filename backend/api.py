from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.core.database import Database
from app.models.sakila import Inventory, Film

app = FastAPI()
router_url = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = Database()

@app.get("/")
async def server_up():
    return {"mensaje":"Servicio de API activo"}

@router_url.post("/checkout", tags=["Alquiler peliculas"])
async def checkout():
    pass

@router_url.get("/titles_inventory", tags=["Inventario"])
async def titles_inventory():
    session = db.SessionLocal()
    try:
        request = (
            select(Inventory.inventory_id, Film.title)
            .join(Film,Inventory.film_id == Film.film_id)
            .group_by(Film.title)
        )
        result = session.execute(request).all()

        formateDict = [
            {"inventory_id":row.inventory_id, "title":row.title}
            for row in result
        ]
        return formateDict

    except:
        return {
            "status":"error",
            "message":"Consulta declinada"
            }
    finally:
        session.close()

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