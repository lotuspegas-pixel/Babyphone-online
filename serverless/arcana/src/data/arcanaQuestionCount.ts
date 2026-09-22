/**
 * Het aantal vragen, los van de vragenbank zelf.
 *
 * De landingspagina en de app-root hebben alleen dit getal nodig (voor "vraag
 * 37 van 120" en de laatste-vraag-check), niet de 30 KB aan vraagteksten. Door
 * het getal apart te zetten kan de vragenbank in een eigen chunk die pas bij
 * "Start de test" wordt geladen. Een test bewaakt dat dit getal gelijk blijft
 * aan de werkelijke lengte van ARCANA_QUESTIONS.
 */
export const QUESTION_COUNT = 120;
