import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./components/ui/input-group"

import { CurrencyDollarIcon, PopcornIcon, UserIcon } from "@phosphor-icons/react"

import { useEffect, useState } from "react"

import api from "@/api/configAxios"

function App() {

  const [catalogo, setCatalogo] = useState<any[]>([]);

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
                >
                </InputGroupInput>
              </InputGroup>
            </Field>
          </FieldGroup>
          <Button>Facturar</Button>
        </FieldSet>
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
