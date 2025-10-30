////////////////////////////////////////////////////////////////////////////////
// bresenham_1458.js
//
// Bresenham-Line-Algorithmus - OKTANTEN 1, 4, 5, 8
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang:   BMI
// Gruppe     :   I
// Autor 1    :   Sedra Alkouatli
// Autor 2    :   Christoph Kern
// Autor 3    :   Lina Khalifeh
// Autor 4    :   Felix Kircher
// Autor 5    :   Sengphachanh Lanavanh
// Autor 6    :   Felix Nienhaus
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// drawLine(x0, y0, x1, y1)
// Diese Implementierung zeichnet in den OKTANTEN 1, 4, 5, 8.
////////////////////////////////////////////////////////////////////////////////


function drawLine(x0, y0, x1, y1){
  // Helferfunktion zur Visualisierung der Oktanten.
  if (typeof ctx !== 'undefined') {
    drawOctantGuides(x0, y0, ctx);
  }

  // Diese Funktion ist für die "flachen" Oktanten 1, 4, 5 und 8 geschrieben.
  // Das sind alle Oktanten, in denen die Änderung in x größer ist als die in y.
  const absDistanceX = Math.abs(x1 - x0);
  const absDistanceY = Math.abs(y1 - y0);

  // Wenn die Linie "steil" ist (dy > dx), wird sie nicht gezeichnet.
  if (absDistanceY > absDistanceX) {
    return;
  }

  // Schrittrichtung für x und y bestimmen (+1 oder -1).
  const stepX = (x0 < x1) ? 1 : -1;
  const stepY = (y0 < y1) ? 1 : -1;

  // Der Fehlerterm entscheidet, wann die "langsame" Achse (Y) einen Schritt macht.
  let errorTerm = absDistanceX / 2.0;

  let currentX = x0;
  let currentY = y0;

  // Die Schleife läuft, solange der Endpunkt nicht erreicht ist.
  while (true) {
    setPixel(currentX, currentY);

    if (currentX === x1 && currentY === y1) {
      break;
    }

    // Fehlerterm aktualisieren.
    errorTerm -= absDistanceY;

    // Wenn der Fehler negativ wird, muss ein Schritt in y-Richtung gemacht werden.
    if (errorTerm < 0) {
      currentY += stepY; // Die Richtung (stepY) wird hier verwendet.
      errorTerm += absDistanceX;
    }

    // Ein Schritt in x-Richtung (stepX) wird immer gemacht, da dies die "schnelle" Achse ist.
    currentX += stepX;
  }
}



////////////////////////////////////////////////////////////////////////////////
// drawOctantGuides(x0, y0, ctx)
// Visualisiert die Oktanten um den Startpunkt
// Grün = funktioniert (Oktanten 1,4,5,8), Rot = nicht implementiert
////////////////////////////////////////////////////////////////////////////////
function drawOctantGuides(x0, y0, ctx) {
  var centerX = 2 * x0 + 1;
  var centerY = 2 * y0 + 1;
  var radius = 80;

  // Nur die flachen Oktanten 1, 4, 5, 8 sind aktiv!
  var activeOctants = [1, 4, 5, 8];

  ctx.save();

  // Zeichne ALLE Oktanten
  for (var oct = 1; oct <= 8; oct++) {
    var startAngle, endAngle;
    var isActive = activeOctants.indexOf(oct) !== -1;

    // Farbe je nach Status
    if (isActive) {
      ctx.strokeStyle = "rgba(100, 200, 100, 0.6)";
      ctx.fillStyle = "rgba(100, 200, 100, 0.15)";
    } else {
      ctx.strokeStyle = "rgba(200, 100, 100, 0.4)";
      ctx.fillStyle = "rgba(200, 100, 100, 0.05)";
    }
    ctx.lineWidth = 2;

    // Oktanten-Winkel
    switch(oct) {
      case 1: startAngle = 0; endAngle = Math.PI / 4; break;
      case 2: startAngle = Math.PI / 4; endAngle = Math.PI / 2; break;
      case 3: startAngle = Math.PI / 2; endAngle = 3 * Math.PI / 4; break;
      case 4: startAngle = 3 * Math.PI / 4; endAngle = Math.PI; break;
      case 5: startAngle = Math.PI; endAngle = 5 * Math.PI / 4; break;
      case 6: startAngle = 5 * Math.PI / 4; endAngle = 3 * Math.PI / 2; break;
      case 7: startAngle = 3 * Math.PI / 2; endAngle = 7 * Math.PI / 4; break;
      case 8: startAngle = 7 * Math.PI / 4; endAngle = 2 * Math.PI; break;
    }

    // Zeichne Sektor
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Trennlinien
  ctx.strokeStyle = "rgba(150, 150, 150, 0.3)";
  ctx.lineWidth = 1;
  for (var i = 0; i < 8; i++) {
    var angle = (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    ctx.stroke();
  }

  // Beschriftung
  ctx.fillStyle = "rgba(80, 80, 80, 0.8)";
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  for (var i = 1; i <= 8; i++) {
    var angle = ((i - 0.5) * Math.PI) / 4;
    var x = centerX + (radius + 18) * Math.cos(angle);
    var y = centerY + (radius + 18) * Math.sin(angle) + 5;
    ctx.fillText(i, x, y);
  }

  ctx.restore();
}
