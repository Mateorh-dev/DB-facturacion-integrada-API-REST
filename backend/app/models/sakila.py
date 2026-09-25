from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass

class Film(Base):
    __tablename__ = "film"

    film_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    title: Mapped[str] = mapped_column(
        String(128),
        nullable=False
    )

class Inventory(Base):
    __tablename__ = "inventory"

    inventory_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    film_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("film.film_id"),
        nullable=False
    )

class Rental(Base):
    __tablename__ = "rental"

    rental_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    rental_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )

    inventory_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("inventory.inventory_id"),
        nullable=False
    )

    customer_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("customer.customer_id"),
        nullable=False
    )

    return_date: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    staff_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("staff.staff_id"),
        nullable=False
    )

class Payment(Base):
    __tablename__ = "payment"

    payment_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    customer_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("customer.customer_id"),
        nullable=False
    )

    staff_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("staff.staff_id"),
        nullable=False
    )

    rental_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("rental.rental_id"),
        nullable=True
    )

    amount: Mapped[Decimal] = mapped_column(
        Numeric(5, 2),
        nullable=False
    )

    payment_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )