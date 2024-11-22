'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Shuffle, History } from 'lucide-react';

const SelettoreNomiCasuali: React.FC = () => {
  const [nomi, setNomi] = useState<string[]>([]);
  const [nuovoNome, setNuovoNome] = useState<string>('');
  const [nomeCasuale, setNomeCasuale] = useState<string | null>(null);
  const [cronologiaEstratti, setCronologiaEstratti] = useState<string[]>([]);
  const [mostraCronologia, setMostraCronologia] = useState<boolean>(false);

  const aggiungiNome = () => {
    if (nuovoNome.trim() !== '') {
      // Evita nomi duplicati
      if (!nomi.includes(nuovoNome.trim())) {
        setNomi([...nomi, nuovoNome.trim()]);
        setNuovoNome('');
      } else {
        // Potrebbe essere utile mostrare un toast o un messaggio di avviso
        alert('Questo nome è già presente nella lista!');
      }
    }
  };

  const scegliNomeCasuale = () => {
    if (nomi.length > 0) {
      const indiceCasuale = Math.floor(Math.random() * nomi.length);
      const nomeScelto = nomi[indiceCasuale];
      
      // Rimuove il nome dalla lista
      const nuoviNomi = nomi.filter((_, index) => index !== indiceCasuale);
      
      setNomeCasuale(nomeScelto);
      setNomi(nuoviNomi);
      
      // Aggiungi alla cronologia
      setCronologiaEstratti([...cronologiaEstratti, nomeScelto]);
    } else {
      setNomeCasuale(null);
    }
  };

  const rimuoviNome = (indice: number) => {
    const nuoviNomi = nomi.filter((_, i) => i !== indice);
    setNomi(nuoviNomi);
  };

  const ripristinaCronologia = () => {
    // Opzione per ripristinare la lista originale con tutti i nomi estratti
    setNomi([...new Set([...nomi, ...cronologiaEstratti])]);
    setCronologiaEstratti([]);
  };

  const cancellaUltimoEstratto = () => {
    if (cronologiaEstratti.length > 0) {
      const ultimoEstratto = cronologiaEstratti[cronologiaEstratti.length - 1];
      setCronologiaEstratti(cronologiaEstratti.slice(0, -1));
      setNomi([...nomi, ultimoEstratto]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      aggiungiNome();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Selettore di Nomi Casuali</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMostraCronologia(!mostraCronologia)}
          >
            <History className={`h-5 w-5 ${cronologiaEstratti.length > 0 ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className="sr-only">Mostra Cronologia</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Inserisci un nome"
              value={nuovoNome}
              onChange={(e) => setNuovoNome(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mb-2"
            />
            <Button onClick={aggiungiNome} className="w-full">
              Aggiungi Nome
            </Button>
          </div>

          {nomeCasuale && (
            <div className="mb-4 p-3 bg-green-100 rounded">
              <p className="font-bold">Nome Scelto: {nomeCasuale}</p>
            </div>
          )}

          {/* Lista Nomi Disponibili */}
          <div className="max-h-40 overflow-y-auto mb-4">
            <h3 className="font-semibold mb-2">Nomi Disponibili:</h3>
            {nomi.length > 0 ? (
              <ul>
                {nomi.map((nome, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
                  >
                    {nome}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => rimuoviNome(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Nessun nome nella lista</p>
            )}
          </div>

          {/* Cronologia Estratti */}
          {mostraCronologia && (
            <div className="max-h-40 overflow-y-auto mt-4 bg-blue-50 p-3 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Cronologia Estratti:</h3>
                <div className="flex items-center space-x-2">
                  {cronologiaEstratti.length > 0 && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={cancellaUltimoEstratto}
                        className="text-xs"
                      >
                        Annulla Ultimo
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={ripristinaCronologia}
                        className="text-xs"
                      >
                        Ripristina Tutto
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {cronologiaEstratti.length > 0 ? (
                <ul>
                  {[...cronologiaEstratti].reverse().map((nome, index) => (
                    <li 
                      key={index} 
                      className="mb-1 p-1 bg-blue-100 rounded text-sm"
                    >
                      {nome}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 text-sm">Nessun nome estratto</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={scegliNomeCasuale} 
            disabled={nomi.length === 0}
            className="w-full"
          >
            <Shuffle className="mr-2 h-4 w-4" /> Scegli Nome Casuale
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SelettoreNomiCasuali;
