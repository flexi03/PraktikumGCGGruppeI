
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
 
  y = y0
  yDiff = y1-y0; // delta y
  xDiff = -(x1-x0); // - delta x
  Q = yDiff+0.5*xDiff; // Initial
  Q_step = yDiff+xDiff;
  Q_equal = yDiff;
 
  
 
 
 
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



////////////////////////////////////////////////////////////////////////////////
// example(i)
// Diese Funktion dient als Codebeispiel.
// Sie wird beim Laden der Seite aufgerufen und kann entfernt werden.
////////////////////////////////////////////////////////////////////////////////
function example(i)
{
  let y = i + 2;
  for (let x = 0; x < 400; x++)
  {
    y--;
    if (y < -i)
    {
      y = i;
    }
    setPixel(x, Math.abs(y));
  }
}
