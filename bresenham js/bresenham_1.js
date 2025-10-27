
////////////////////////////////////////////////////////////////////////////////
// bresenham.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang:
// Gruppe     :
// Autor 1    :
// Autor 2    :
// Autor 3    :
// Autor 4    :
// Autor 5    :
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// drawLine(x0, y0, x1, y1)
// Diese Funktion soll eine Linie von (x0, y0) nach (x1, y1) zeichnen.
// Implementieren Sie dazu den Bresenham-Line-Algorithmus für alle Oktanten
// in dieser Funktion. Einen Punkt zeichnen Sie mit setPixel(x,y).
////////////////////////////////////////////////////////////////////////////////
function drawLine(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;

  let Q = dy + 0.5 * dx; // Entscheidungsvariable: bestimmt, ob y erhöht werden soll
  let Q_step = dy - dx;  // wie stark Q angepasst wird, wenn y erhöht wird
  let Q_equal = dy;      // wie stark Q angepasst wird, wenn y nicht erhöht wird

  //1. Es muss möglich sein, dass x und y auch negativ sind
  //2. Die Direction im For-Loop muss auch gegen y-Richtung gehen
  

  for (let x=x0; x<=x1 ; x++) {
            setPixel(x,y);
          if (Q<0)
            Q=Q+Q_equal; // no y increment
 
            else { // Q >0
              Q=Q+Q_step;
            y++;
        }
      }
}

  /*if (dx !== 0) {
    let x = x0;
    let D = 2*  dy - dx; // Entscheidungsvariable

    for (let y = y0; y <= y1; y++) {
      setPixel(x, y);

      if(D > 0) {
      x += i; 
      D -= 2* dy;
      }
    D += 2* dx;  
    }
  }
}*/



////////////////////////////////////////////////////////////////////////////////
// example(i)
// Diese Funktion dient als Codebeispiel.
// Sie wird beim Laden der Seite aufgerufen und kann entfernt werden.
////////////////////////////////////////////////////////////////////////////////
function example(i)
{
  let y = i + 2; //Y ist immer 2 größer als übergebender Wert
  for (let x = 0; x < 400; x++) //400 wdh
  {
    y--;          //Y wird um 1 decreased
    if (y < -i)   // Wenn Y kleiner ist als -i
    {
      y = i;      // wird y = 1
    }
    setPixel(x, Math.abs(y)); //Pixel an der stelle wird gemalt
  }
}

