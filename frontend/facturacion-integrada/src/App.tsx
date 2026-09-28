import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./components/ui/input-group"

import { CurrencyDollarIcon, PopcornIcon, UserIcon } from "@phosphor-icons/react"

import { type FormEvent, useEffect, useState } from "react"

import api from "@/api/configAxios"

type CatalogItem = {
  inventory_id: number
  title: string
}

type CheckoutForm = {
  inventory_id: number
  customer_id: string
  staff_id: string
  amount: string
}

function App() {

  const [catalogo, setCatalogo] = useState<CatalogItem[]>([]);
  const [formData, setFormData] = useState<CheckoutForm>({
    inventory_id: 0,
    customer_id: "",
    staff_id: "",
    amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getCatalogo = async () => {
    try {
      const request = await api.get('api/titles_inventory');
      setCatalogo(request.data);
      console.log(request.data)
    }
    catch (error) {
      setCatalogo([]);
    }
  }

  useEffect (()=>{
    getCatalogo()
  }, []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!formData.inventory_id || !formData.customer_id || !formData.staff_id || !formData.amount) {
      setError("Completa todos los campos para facturar.");
      return;
    }

    const payload = {
      inventory_id: formData.inventory_id,
      customer_id: Number(formData.customer_id),
      staff_id: Number(formData.staff_id),
      amount: Number(formData.amount),
    };

    try {
      setIsSubmitting(true);
      await api.post("api/checkout", payload);
      setMessage("Alquiler facturado correctamente.");
      setFormData({ inventory_id: 0, customer_id: "", staff_id: "", amount: "" });
    } catch {
      setError("No se pudo registrar la factura. Verifica los datos e inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="h-screen flex justify-center items-center">
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>
          Alquiler de películas
        </CardTitle>
        <CardDescription>
          Sistema POS, cajeros de Sakila
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>
                <Badge><UserIcon></UserIcon></Badge>
                ID Cliente
              </FieldLabel>
              <Input 
              placeholder="12345" 
              type="number"
              max="99999"
              value={formData.customer_id}
              onChange={(event) => setFormData({ ...formData, customer_id: event.target.value })}
              required
              >
              </Input>
            </Field>

            <Field>
              <FieldLabel>
                <Badge><UserIcon></UserIcon></Badge>
                ID Empleado
              </FieldLabel>
              <Input 
              placeholder="123" 
              type="number"
              max="999"
              value={formData.staff_id}
              onChange={(event) => setFormData({ ...formData, staff_id: event.target.value })}
              required
              >
              </Input>
            </Field>

            <Field>
              <FieldLabel>
                <Badge><PopcornIcon></PopcornIcon></Badge>
                Película
              </FieldLabel>
                <Combobox 
                items={catalogo}
                onValueChange={(value) => {
                  const selected = catalogo.find((item) => item.title === value);
                  setFormData({ ...formData, inventory_id: selected?.inventory_id ?? 0 });
                }}
                >
                  <ComboboxInput placeholder={(catalogo.length === 0) ? "Cargando..." : "Seleccione"}>
                  </ComboboxInput>
                  <ComboboxContent>
                    <ComboboxEmpty>No encontrada</ComboboxEmpty>
                    <ComboboxList>
                      {
                        (item) => (
                          <ComboboxItem 
                          key={item.inventory_id}
                          value={item.title}>
                            {item.title}
                          </ComboboxItem>
                        )
                      }
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
            </Field>

            <Field>
              <FieldLabel>
                <Badge><CurrencyDollarIcon></CurrencyDollarIcon></Badge>
                Coste
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                $
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="123" 
                  type="number"
                  className="text-right"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(event) => setFormData({ ...formData, amount: event.target.value })}
                  required
                >
                </InputGroupInput>
              </InputGroup>
            </Field>
          </FieldGroup>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Facturando..." : "Facturar"}
          </Button>
        </FieldSet>
        </form>
      </CardContent>
      <CardFooter>
        <Badge variant={"secondary"}>
          By: Luna Riveros R. & Mateo Rodríguez H.
        </Badge>
      </CardFooter>
    </Card>
    </div>
    </>
  )
}

export default App
