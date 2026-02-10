# Pflichtenheft - _Chef's Note_

_Chef's Note_ ist eine mobile Anwendung, die Nutzende bei der einfachen Planung und Organisation von Mahlzeiten unterstützt.

## Inhaltsverzeichnis

- [1. Einleitung](#1-einleitung)
  - [Motivation und Zielsetzung](#motivation-und-zielsetzung)
- [2. Grundlagen](#2-grundlagen)
  - [Detaillierte Problemstellung](#detaillierte-problemstellung)
  - [Technologieauswahl (mit Begründung)](#technologieauswahl-mit-begründung)
  - [Use Cases](#use-cases)
- [3. Umsetzung / Implementierung](#3-umsetzung--implementierung)
  - [Architektur-Überblick](#architektur-überblick)
- [4. Qualitätssicherung und Deployment](#4-qualitätssicherung-und-deployment)
  - [Qualitätssicherung](#qualitätssicherung)
  - [Deployment](#deployment)
- [5. Fazit](#5-fazit)
- [Anhang: Entwicklungsumgebung und Projektstart](#anhang-entwicklungsumgebung-und-projektstart)

## 1. Einleitung

### Motivation und Zielsetzung

Im Alltag vieler Menschen entsteht eine zentrale Herausforderung: die Planung von abwechslungsreichen und ausgewogenen Mahlzeiten. Mit der Zeit sammeln sich zahlreiche Rezepte aus verschiedensten Quellen, wie beispielsweise handschriftliche Notizen, Kochbücher, Webseiten oder soziale Medien, die verstreut und unorganisiert sind. Dies führt zu Überforderung, kostet unnötig Zeit und verstärkt die Tendenz, immer wieder zu denselben Gerichten zu greifen. Das Resultat ist häufig eine unausgewogene Ernährung und der Verlust kulinarischer Vielfalt.

_Chef's Note_ adressiert dieses Problem durch eine zentrale, intuitive Plattform zur Rezeptverwaltung. Die Anwendung ermöglicht es Nutzenden, ihre Rezepte schnell zu sammeln, übersichtlich zu organisieren und intelligent zu planen. Darüber hinaus unterstützt _Chef's Note_ durch automatisierte Funktionen bei der Mahlzeitenplanung und der Erstellung von Einkaufslisten, um den gesamten Workflow vom Rezeptgedanken bis zur Umsetzung in der Küche zu vereinfachen.

## 2. Grundlagen

### Detaillierte Problemstellung

**Zentrale Herausforderungen:**

1. **Fragmentierte Rezeptquellen:** Nutzer sammeln Rezepte aus diversen Quellen (physische Notizen, Bücher, eBooks, Websites, Social Media), was zu einer unorganisierten und schwer zugänglichen Rezeptsammlung führt. Es gibt kein zentrales System zur Verwaltung und schnellen Auffindung von Rezepten.

2. **Zeitaufwendige Mahlzeitenplanung:** Die manuelle Planung von Mahlzeiten für mehrere Tage ist zeitintensiv, da Rezepte an unterschiedlichen Stellen liegen. Nutzer müssen manuell überprüfen, welche Zutaten verfügbar sind und welche besorgt werden müssen. Die Erstellung einer entsprechenden Einkaufsliste wird dadurch Fehleranfällig und Zeitaufwändig.

3. **Ineffiziente Einkaufsvorbereitung:** Das Erstellen von Einkaufslisten basierend auf geplanten Rezepten ist mühsam. Zutaten werden mehrfach notiert, Mengen werden nicht aggregiert und es entsteht eine unübersichtliche Liste.

4. **Mangelnde Vielfalt und Monotonie:** Aufgrund der Unorganisiertheit greifen Nutzer regelmäßig zu denselben bekannten Rezepten zurück, was zu einer unausgewogenen Ernährung und mangelnder kulinarischer Vielfalt führt.

5. **Fehlende Planungsunterstützung:** Es gibt keine integrierte Lösung, die Rezeptsammlung, Mahlzeitenplanung und Einkaufsplanung miteinander verbindet. Nutzer müssen mehrere Tools oder manuelle Prozesse verwenden.

**Zielgruppe:**
Die Anwendung richtet sich an Privatpersonen, die ihre Mahlzeitenplanung optimieren, ihre Rezepte zentral verwalten und Zeit bei der Organisation sparen möchten – von Kochanfängern bis zu erfahrenen Hobby-Köchen.

### Technologieauswahl (mit Begründung)

| Technologie                 | Zweck                                                   | Begründung                                                                                                |
| --------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Expo**                    | Framework für plattformübergreifende mobile Entwicklung | Ermöglicht schnelle Entwicklung und einfaches Testing auf iOS und Android ohne native Build-Konfiguration |
| **React Native**            | Native Mobile App Entwicklungsframework                 | Erlaubt Code-Sharing zwischen iOS und Android mit nativer Performance                                     |
| **Expo Router**             | Navigation und Routing für React Native                 | Dateibasiertes Routing ähnlich wie Next.js, ermöglicht strukturierte und intuitive Navigation             |
| **TypeScript**              | Statisch typisierte JavaScript-Variante                 | Verbessert Code-Qualität, ermöglicht frühe Fehlererkennung und bessere Developer Experience               |
| **React Navigation**        | Navigation zwischen Screens und Tabs                    | Flexible und performante Navigationslösung mit Bottom-Tab und Stack Navigation Patterns                   |
| **Async Storage**           | Persistente lokale Datenspeicherung                     | Einfache und zuverlässige Methode zur Offline-Persistierung von Rezepten und Plänen auf dem Gerät         |
| **React Native StyleSheet** | Styling der Benutzeroberfläche                          | Native StyleSheet API für performance-optimiertes und plattformübergreifendes Styling ohne CSS            |
| **ESLint**                  | Code-Linting und Formatierung                           | Sichert Code-Qualität, Konsistenz und verhindert häufige Fehler                                           |
| **Gradle**                  | Build-System für Android                                | Standard-Build-Tool für Android-Entwicklung, integriert in Expo-Workflow                                  |

### Use Cases

1. **Rezept hinzufügen**
   - Benutzer öffnet die App und klickt auf den "+" Button
   - Modal öffnet sich (implementiert als `components/RecipeFormModal.tsx`) mit Eingabefeldern für Titel, Zutaten und Schritte
   - Benutzer speichert das Rezept in der lokalen Speicherung

2. **Rezept anschauen**
   - Benutzer navigiert zur Rezeptliste
   - Klickt auf ein Rezept und sieht Zutaten und Schritte

3. **Rezept bearbeiten**
   - Benutzer öffnet ein Rezept und klickt den Bearbeitungs-Button (Stift-Icon)
   - Modal öffnet sich (implementiert als `components/RecipeFormModal.tsx`) mit allen Feldern zum Ändern
   - Änderungen werden gespeichert

4. **Rezept löschen**
   - Benutzer öffnet ein Rezept und klickt den Löschen-Button (Mülleimer-Icon)
   - Bestätigungsdialog erscheint
   - Rezept wird nach Bestätigung gelöscht

5. **Rezept zur Planung auswählen**
   - Benutzer öffnet ein Rezept und klickt den Stern-Button
   - Rezept wird als "selected" markiert
   - Rezept erscheint auf der "Planned" Seite

6. **Geplante Mahlzeiten anschauen**
   - Benutzer navigiert zur "Planned" Seite (Kalender-Tab)
   - Sieht alle Rezepte, die als "selected" markiert sind

7. **Einkaufsliste generieren**
   - Benutzer navigiert zur "Shopping List" Seite (Wagen-Tab)
   - Sieht aggregierte Zutaten aus allen geplanten Rezepten
   - Kann Zutaten abhaken (checked)

8. **Kochanleitung folgen**
   - Benutzer öffnet ein Rezept und klickt "Start cooking!"
   - Wird zu Schritt-für-Schritt Seite navigiert
   - Kann mit "Next Step" / "Previous Step" Buttons navigieren

9. **KI-basierter Rezeptimport (Link / Text / Video)**
   - Benutzer fügt einen Link zu einem Rezept oder Video ein (z. B. Blog, Webseite, YouTube)
   - Lokale KI analysiert die Zielseite bzw. Transkription, extrahiert Titel, Zutaten und Schritte
   - Eine Vorschau des erkannten Rezepts wird angezeigt; Benutzer bestätigt oder bearbeitet die Felder
   - Bestätigtes Rezept wird lokal gespeichert

10. **KI-basierter Rezeptimport (Bild / Foto)**
    - Benutzer macht ein Foto eines gedruckten Rezepts oder eines Bildschirms / pausiert ein Video-Frame
    - Lokale KI führt semantische Zuordnung durch, erkennt Zutaten, Mengenangaben und Schritte
    - App zeigt erkannte Felder zur Bestätigung/Bearbeitung an
    - Bestätigtes Rezept wird lokal gespeichert

11. **Lokalisierung / Übersetzung**
    - Benutzer wählt eine bevorzugte Sprache in den Einstellungen oder die App detektiert Sprache automatisch
    - UI-Strings sind übersetzbar; importierte Rezepte können lokal in die Nutzersprache übersetzt werden
    - Nutzer kann erkannte Übersetzungen prüfen und manuell anpassen, bevor gespeichert wird

12. **Daten-Import / Export** 
    - Benutzer exportiert Rezepte als JSON/CSV oder importiert Rezepte/Backups aus anderen Quellen
    - Import zeigt Vorschau mit Feldzuordnung (z. B. Zutaten, Mengen, Schritte) und verlangt Nutzerbestätigung
    - Import/Export kann lokal erfolgen; optionale Ergänzung durch Cloud-Import ist möglich

13. **Cloud-Speicher & Nutzerprofil**
    - Nutzer kann ein Konto anlegen und Rezepte in der Cloud synchronisieren (Backup & Sync)
    - Synchronisierung ist optional; lokale-only Modus bleibt Standard
    - Datenschutz: Nutzer entscheidet, ob Daten cloudgespeichert werden; sichere Authentifizierung und Verschlüsselung

### User Stories

**Rezept-Verwaltung:**

- Als **Hobbyköchin**, möchte ich **meine Lieblingsrezepte zentral speichern können**, damit **ich sie jederzeit schnell finde und nicht mehrere Apps durchsuchen muss**.
- Als **Kochanfänger**, möchte ich **Rezepte mit Zutaten und Schritt-für-Schritt Anleitung speichern**, damit **ich die Rezepte später reproduzieren kann**.

**Mahlzeitenplanung:**

- Als **berufstätige Person**, möchte ich **Rezepte für die kommende Woche auswählen können**, damit **ich beim Einkaufen weiß, was ich kaufen muss**.
- Als **Familie mit Kindern**, möchte ich **Mahlzeiten planen und ändern können**, damit **die Familie ausgewogen und vielfältig isst**.

**Einkaufsvorbereitung:**

- Als **Einkaufer**, möchte ich **eine Einkaufsliste aus meinen geplanten Rezepten generiert bekommen**, damit **ich keine Zutat vergesse und Zeit beim Einkaufen spare**.
- Als **Sparsamer Einkaufer**, möchte ich **Zutaten abhaken beim Einkaufen**, damit **ich überblicke, was ich bereits gekauft habe**.

**Rezept-Umsetzung:**

- Als **ablenkungsfähiger Koch**, möchte ich **Schritt-für-Schritt durch ein Rezept geführt werden**, damit **ich den aktuellen Fortschritt nicht verliere**.
- Als **erfahrener Koch**, möchte ich **alle Zutaten und Schritte auf einen Blick sehen**, damit **ich schnell kochen kann**.

**Rezept-Bearbeitung:**

- Als **Experimentierfreudiger**, möchte ich **meine Rezepte ändern und anpassen können**, damit **ich meine persönlichen Variationen speichern kann**.
- Als **Nutzer**, möchte ich **Rezepte löschen können**, damit **meine Sammlung nicht mit überflüssigen Rezepten vollläuft**.

**AI-basierte Aufnahme:**

- Als **schnelle Nutzerin**, möchte ich **ein Rezept per Link (Blog/Video) hinzufügen können**, damit **ich Rezepte aus dem Web ohne manuellen Aufwand in meine Sammlung übernehme**.
- Als **fotofreundlicher Nutzer**, möchte ich **ein gedrucktes Rezept per Foto hinzufügen können**, damit **ich schnell physische Rezepte digitalisiere**.
- Als **datenschutzbewusster Nutzer**, möchte ich **dass die AI lokal auf dem Gerät läuft**, damit **keine Rezeptdaten das Gerät verlassen und meine Daten privat bleiben**.

**Optionale Funktionen:**

- Als **internationaler Nutzer**, möchte ich **die App in meiner Sprache nutzen können**, damit **ich UI-Elemente und Rezeptinhalte besser verstehe**. (Lokalisierung / Übersetzung)
- Als **Backup-orientierter Nutzer**, möchte ich **meine Rezepte exportieren und importieren können**, damit **ich Backups erstelle oder Rezepte zwischen Geräten und Apps übertrage**. (Daten-Import / Export)
- Als **geräteübergreifender Nutzer**, möchte ich **ein Cloud-Konto und Synchronisation haben**, damit **meine Rezepte auf mehreren Geräten verfügbar sind und gesichert werden**. (Cloud-Speicher & Nutzerprofil)
- Als **datenschutzbewusster Nutzer**, möchte ich **dass Cloud-Synchronisation optional ist und ich kontrolliere, welche Daten geteilt werden**, damit **meine privaten Rezepte lokal bleiben können**.

### Requirements

| ID      | Name                              | Priorität    | Beschreibung                                                                                                                                 | Use Case |
| ------- | --------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| REQ-001 | Rezept erstellen                  | MUST         | Benutzer kann ein neues Rezept mit Titel, Zutaten und Kochschritten erstellen und speichern                                                  | UC1      |
| REQ-002 | Rezepte anzeigen                  | MUST         | Benutzer kann alle gespeicherten Rezepte in einer Liste anschauen                                                                            | UC2      |
| REQ-003 | Rezept anschauen                  | MUST         | Benutzer kann ein einzelnes Rezept mit allen Details (Titel, Zutaten, Schritte) öffnen und ansehen                                           | UC2      |
| REQ-004 | Rezept bearbeiten                 | MUST         | Benutzer kann ein gespeichertes Rezept bearbeiten und die Änderungen speichern                                                               | UC3      |
| REQ-005 | Rezept löschen                    | MUST         | Benutzer kann ein Rezept mit Bestätigungsdialog löschen                                                                                      | UC4      |
| REQ-006 | Rezept zur Planung markieren      | MUST         | Benutzer kann ein Rezept mit einem Stern-Button als "geplant" markieren                                                                      | UC5      |
| REQ-007 | Geplante Rezepte filtern          | MUST         | Benutzer kann auf der "Planned"-Seite alle markierten Rezepte anschauen                                                                      | UC6      |
| REQ-008 | Einkaufsliste generieren          | CAN          | System aggregiert automatisch Zutaten aus allen geplanten Rezepten                                                                           | UC7      |
| REQ-009 | Zutaten abhaken                   | CAN          | Benutzer kann Zutaten in der Einkaufsliste abhaken als erledigt                                                                              | UC7      |
| REQ-010 | Schritt-für-Schritt Anleitung     | CAN          | Benutzer kann ein Rezept mit Navigation durch einzelne Kochschritte kochen                                                                   | UC8      |
| REQ-011 | Lokale Persistierung              | MUST         | Alle Rezepte werden lokal auf dem Gerät gespeichert und bleiben nach App-Neustart erhalten                                                   | Alle     |
| REQ-012 | Navigation zwischen Screens       | MUST         | Tab-basierte Navigation zwischen Rezepte, Geplant und Einkaufsliste                                                                          | Alle     |
| REQ-013 | Responsive UI                     | MUST         | Benutzeroberfläche funktioniert auf verschiedenen Gerätetypen und Bildschirmgrößen                                                           | Alle     |
| REQ-014 | AI-Rezeptimport (Link/Text/Video) | OPTIONAL | Lokale KI extrahiert Titel, Zutaten und Schritte aus Webseiten oder Video-Transkripten; Nutzer bestätigt erkannte Felder vor dem Speichern   | UC9      |
| REQ-015 | AI-Rezeptimport (Bild/OCR)        | OPTIONAL | Lokale KI führt OCR und semantische Zuordnung auf Fotos/Frames aus, erkennt Zutaten, Mengen und Schritte; Nutzer bestätigt vor dem Speichern | UC10     |
| REQ-016 | Lokalisierung / Übersetzung       | OPTIONAL | App bietet UI-Lokalisierung; importierte Rezepte können lokal in die Nutzersprache übersetzt werden; Nutzer kann Sprache wählen und Übersetzungen bestätigen | UC11     |
| REQ-017 | Daten-Import / Export             | OPTIONAL | Benutzer kann Rezepte lokal als JSON/CSV exportieren und importieren; Import zeigt Mapping/Preview und verlangt Bestätigung | UC12     |
| REQ-018 | Cloud-Speicher & Nutzerprofil     | OPTIONAL | Optionale Cloud-Konten zur Synchronisation und Backup; sichere Authentifizierung; Nutzer kann Sync deaktivieren und lokale Speicherung bevorzugen | UC13     |

## 3. Umsetzung / Implementierung

### Architektur-Überblick

Die Anwendung folgt einer **schichtenorientierten Architektur** mit klarer Separation of Concerns. Die Anwendung ist in vier Hauptschichten unterteilt:

```
┌─────────────────────────────────────────────────────────┐
│          Presentation Layer (UI / Screens)              │
│  (index.tsx, planned.tsx, shopping_list.tsx, etc.)      │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│           Business Logic Layer (Hooks)                  │
│              (useRecipes.ts)                            │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│      Data Access Layer (Persistence)                    │
│         (recipeStorage.ts)                              │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│        Data Layer (Models)                              │
│        (Recipe.ts - TypeScript Interfaces)              │
└─────────────────────────────────────────────────────────┘
```

### Schichten und ihre Komponenten

#### 1. **Data Layer (Datenmodelle)**

**Datei:** [models/Recipe.ts](models/Recipe.ts)

Diese Schicht definiert die Datenstrukturen der Anwendung als TypeScript-Interfaces:

- **`Recipe`-Interface:** Repräsentiert ein einzelnes Rezept mit:
  - `id`: Eindeutige Identifier (UUID)
  - `title`: Name des Rezepts
  - `selected`: Boolean-Flag für die Mahlzeitenplanung
  - `ingredients`: Array von Zutaten
  - `steps`: Array von Kochschritten

- **`Ingredient`-Interface:** Beschreibt eine einzelne Zutat mit:
  - `name`: Name der Zutat
  - `quantity`: Menge (optional, z.B. "250g", "2 Stück")
  - `checked`: Boolean-Flag für Einkaufslisten-Status

Diese Interfaces dienen als Verträge (Contracts) für alle anderen Schichten und stellen sicher, dass Daten typsicher verarbeitet werden.

#### 2. **Data Access Layer (Persistierung)**

**Datei:** [persistence/recipeStorage.ts](persistence/recipeStorage.ts)

Diese Schicht ist verantwortlich für die Speicherung und das Abrufen von Daten von der lokalen AsyncStorage des Geräts. Sie stellt folgende Funktionen bereit:

- **`saveRecipes(recipes: Recipe[])`:** Speichert ein Array von Rezepten als JSON-String in AsyncStorage
- **`loadRecipes(): Promise<Recipe[]>`:** Lädt alle Rezepte aus dem lokalen Speicher
- **`getRecipeById(id: string): Promise<Recipe | null>`:** Ruft ein einzelnes Rezept anhand seiner ID ab

**Kommunikation:** Diese Schicht wird ausschließlich vom `useRecipes`-Hook aufgerufen und ist unabhängig von der UI-Implementierung.

**Fehlerbehandlung:** Alle Funktionen haben Try-Catch-Blöcke und loggen Fehler in die Konsole, ohne die Anwendung zum Absturz zu bringen.

#### 3. **Business Logic Layer (State Management und Hooks)**

**Datei:** [hooks/useRecipes.ts](hooks/useRecipes.ts)

Dies ist das Herzstück der Anwendung. Der `useRecipes`-Hook verwaltet den gesamten Anwendungszustand und orchestriert die Kommunikation zwischen der UI und der Persistierungs-Schicht.

**State-Variablen:**

- `recipes`: Array aller Rezepte
- `isLoading`: Boolean für Lade-Status

**Kern-Funktionen:**

- **`addRecipe(title, ingredients, steps)`:** Erstellt ein neues Rezept mit eindeutiger ID und speichert es
- **`updateRecipe(updatedRecipe)`:** Aktualisiert ein vorhandenes Rezept und persistiert die Änderung
- **`removeRecipe(id)`:** Löscht ein Rezept aus dem lokalen Speicher
- **`getRecipe(id)`:** Ruft ein einzelnes Rezept nach ID ab (asynchron)
- **`reloadRecipes()`:** Aktualisiert den lokalen Zustand aus dem persistenten Speicher
- **`loadRecipes()`:** Initial-Load beim App-Start über useEffect

**Datenfluss:**

1. Hook wird in React-Komponenten verwendet
2. UI ruft Hook-Methoden auf
3. Hook verwaltet lokalen State (React useState)
4. Hook ruft persistierungs-Funktionen auf
5. Hook aktualisiert den lokalen State nach Persistierung

#### 4. **Presentation Layer (UI / Screens)**

Diese Schicht besteht aus React Native-Komponenten und Screens, die die Benutzeroberfläche darstellen.

**Haupt-Screens:**

- **[app/index.tsx](app/index.tsx) - Rezeptliste:**
  - Zeigt alle Rezepte in einer FlatList
  - Bietet Modal zum Hinzufügen neuer Rezepte
  - Nutzt `useRecipes`-Hook zum Verwalten von Rezepten
  - Input-Felder für Titel, Zutaten und Kochschritte
  - Buttons zum Hinzufügen/Entfernen von Zutaten und Schritten

- **[app/planned.tsx](app/planned.tsx) - Mahlzeitenplanung:**
  - Filtert und zeigt nur Rezepte mit `selected: true`
  - Ermöglicht Navigation zu Rezept-Details
  - Tab-Navigation zum Wechsel zwischen Screens

- **[app/shopping_list.tsx](app/shopping_list.tsx) - Einkaufsliste:**
  - Aggregiert Zutaten aus allen geplanten Rezepten
  - Zeigt Zutaten pro Rezept mit Check-Box Status
  - Erlaubt das Abhaken von Zutaten mittels `handleToggleIngredient`
  - Ruft `updateRecipe` auf, um checked-Status zu persistieren

- **[app/recipe/[id]/index.tsx](app/recipe/[id]/index.tsx) - Rezept-Details:**
  - Zeigt vollständige Rezept-Details (Zutaten, Schritte)
  - Ermöglicht Bearbeitung des Rezepts (Modal)
  - Bereitstellung von Tasten zum Löschen, Markieren und Kochen
  - Dynamisches Routing basierend auf Rezept-ID

- **[app/recipe/[id]/steps.tsx](app/recipe/[id]/steps.tsx) - Schritt-für-Schritt Anleitung:**
  - Zeigt einzelne Kochschritte nacheinander
  - Navigation zwischen Schritten mit Previous/Next Buttons

**UI-Komponenten:**

- **[components/Button.tsx](components/Button.tsx):** Wieder­verwendbare Button-Komponente mit Styling
- **[components/tabs.tsx](components/tabs.tsx):** Tab-Navigation zwischen Rezepte, Geplant und Einkaufsliste
- **[components/shopping_list_item.tsx](components/shopping_list_item.tsx):** Komponente zur Anzeige einzelner Zutaten mit Check-Box
- **[components/RecipeFormModal.tsx](components/RecipeFormModal.tsx):** Wiederverwendbares Modal-Formular zum Erstellen und Bearbeiten von Rezepten
- **[components/RecipeCard.tsx](components/RecipeCard.tsx):** Wiederverwendbare Karte für die Anzeige von Rezepten in Listen
- **[components/FloatingAddButton.tsx](components/FloatingAddButton.tsx):** Wiederverwendbarer Floating-Action-Button (z. B. für Neues Rezept)
- **[components/confirm.ts](components/confirm.ts):** Utility `showConfirm` für Bestätigungsdialoge (Promise-basiert)

### Kommunikationsflüsse zwischen Schichten

#### Beispiel 1: Neues Rezept hinzufügen

```
UI (index.tsx)
  ↓ Benutzer füllt Formular aus und klickt "Save"
  ↓ Aufrufen: addRecipe(title, ingredients, steps)
Business Logic (useRecipes.ts)
  ↓ Erstellt Recipe-Objekt mit eindeutiger ID
  ↓ Ruft saveRecipes([...recipes, newRecipe]) auf
Data Access (recipeStorage.ts)
  ↓ Konvertiert zu JSON und speichert in AsyncStorage
AsyncStorage (Device)
  ↓ Persistiert Daten auf dem Gerät
```

#### Beispiel 2: Rezept zur Planung markieren

```
UI (recipe/[id]/index.tsx)
  ↓ Benutzer klickt Stern-Icon
  ↓ Aufrufen: updateRecipe({...recipe, selected: !recipe.selected})
Business Logic (useRecipes.ts)
  ↓ Aktualisiert recipes Array
  ↓ Ruft saveRecipes(newRecipes) auf
Data Access (recipeStorage.ts)
  ↓ Persistiert aktualisierte Rezepte
UI (planned.tsx)
  ↓ Filtert nach selected: true
  ↓ Zeigt aktualisierte Liste an
```

#### Beispiel 3: Zutat abhaken in Einkaufsliste

```
UI (shopping_list.tsx)
  ↓ Benutzer klickt Checkbox neben Zutat
  ↓ Aufrufen: handleToggleIngredient(recipeId, index, checked)
  ↓ Aufrufen: updateRecipe({...recipe, ingredients: [...updated]})
Business Logic (useRecipes.ts)
  ↓ Aktualisiert recipes Array
  ↓ Ruft saveRecipes(newRecipes) auf
Data Access (recipeStorage.ts)
  ↓ Persistiert aktualisierte Zutaten-Status
```

### Technische Design-Patterns

**1. Custom React Hook Pattern:** `useRecipes` kapselt die gesamte Geschäftslogik und macht sie wiederverwendbar. Dies ist eine bewährte Praktik in der modernen React-Entwicklung.

**2. Separation of Concerns:** Jede Schicht hat eine klare Verantwortung:

- Modelle definieren Datenstrukturen
- Data Access kümmert sich um Persistierung
- Hooks verwalten Zustand und Logik
- UI konzentriert sich auf Darstellung

**3. Async/Await Pattern:** Alle I/O-Operationen (AsyncStorage) verwenden moderne async/await-Syntax für bessere Lesbarkeit.

**4. State Lifting:** Der Zustand wird im Hook verwaltet und an die Komponenten weitergegeben, nicht umgekehrt.

**5. Dynamic Routing:** Expo Router ermöglicht URL-Parameter wie `[id]` für dynamische Rezept-Details-Seiten.

### Navigation und Routing

Die Anwendung nutzt **Expo Router** mit dem folgenden Struktur:

- `/` (index.tsx) - Rezeptliste (Standard-Tab)
- `/planned` - Mahlzeitenplanung
- `/shopping_list` - Einkaufsliste
- `/recipe/[id]` - Rezept-Details (mit dynamischer ID)
- `/recipe/[id]/steps` - Schritt-für-Schritt Anleitung

Die Tab-Navigation wird durch die `Tabs`-Komponente bereitgestellt und ermöglicht einfaches Navigieren zwischen den Hauptseiten.

## 4. Qualitätssicherung und Deployment

### Qualitätssicherung

**Aktuelle Phase - Endnutzertests:**

In der aktuellen Entwicklungsphase wird die Anwendung durch systematische Endnutzertests validiert. Dies umfasst:

- Manuelle Tests der Core-Funktionalität (Rezepte erstellen, bearbeiten, löschen, planen)
- Tests der Navigation und UI-Responsivität auf verschiedenen Android-Geräten
- Validierung der lokalen Persistierung (AsyncStorage) nach App-Neustarts
- Überprüfung der Einkaufslisten-Generierung und Ingredient-Aggregation

Endnutzertests ermöglichen schnelles Feedback und iterative Verbesserungen während der aktiven Entwicklung.

**Zukünftige Phase - Unit-Tests mit Jest:**

Zum Sicherstellen der langfristigen Code-Qualität und zur Vermeidung von Regressions sind folgende Unit-Test-Implementierungen geplant:

- **Hook-Tests:** Unit-Tests für `useRecipes` Hook zur Validierung von CRUD-Operationen (Create, Read, Update, Delete)
- **Storage-Tests:** Tests für die `recipeStorage` Persistierungs-Schicht
- **Utility-Tests:** Tests für Hilfsfunktionen (z. B. Ingredient-Aggregation, Validation-Logik)
- **Component-Tests:** Jest-Snapshots und Rendering-Tests für kritische UI-Komponenten
- **Integration-Tests:** Tests der Workflow-Abläufe (z. B. Rezept erstellen → planen → Einkaufsliste)

Jest wird als Test-Runner konfiguriert und in die CI/CD-Pipeline integriert, um Qualität zu sichern.

**Was ist Jest?**

Jest ist ein modernes JavaScript-Test-Framework, entwickelt von Facebook und optimiert für React-Projekte und React Native Anwendungen. Jest bietet:

- **Einfache Syntax:** Intuitive und leicht verständliche Test-Syntax mit `describe()` und `it()`-Blöcken
- **Built-in Assertions:** Umfangreiche Assertions und Matchers ohne zusätzliche Bibliotheken
- **Snapshot Testing:** Automatische Erfassung und Vergleich von UI-Snapshots zur Erkennung unerwarteter Änderungen
- **Mocking & Spies:** Einfaches Mocking von Funktionen, Module und externe Abhängigkeiten
- **Coverage Reports:** Automatische Generierung von Code-Coverage-Reports zur Messung der Test-Abdeckung
- **Parallelisierung:** Tests laufen parallel für schnellere Ausführung
- **Watch Mode:** Automatische Neu-Ausführung von Tests bei Dateiänderungen während der Entwicklung

Im Kontext von Chef's Note wird Jest verwendet, um sicherzustellen, dass die Geschäftslogik (Hooks, Storage-Layer) zuverlässig funktioniert und Code-Änderungen keine unerwarteten Seiteneffekte verursachen.

### Deployment

**Aktuelle Phase - Lokale Android APK:**

Die Anwendung wird aktuell als lokale Android APK (Android Package) gebaut und auf Android-Geräten oder Emulatoren installiert:

1. **Build-Prozess:** Über `expo build:android` oder Gradle wird die APK aus dem React Native/Expo-Projekt kompiliert
2. **Signierung:** Die APK wird mit einem Entwickler-Zertifikat signiert
3. **Installation:** Installation auf physischen Android-Geräten via USB oder auf dem Android-Emulator
4. **Testing:** Endnutzer und Tester installieren und prüfen die lokale APK
5. **Iteration:** Bei Fehlern oder Verbesserungen wird eine neue APK gebaut und neu installiert

Dieser Ansatz ermöglicht schnelle lokale Tests und Validierung während der Entwicklung.

**Zukünftige Phase - App-Store Deployment:**

Zum breiten Rollout der Anwendung ist Deployment über offizielle App-Stores geplant:

- **Google Play Store:** Verteilung der APK über den offiziellen Android App Store mit Freigabeprozess und Versionsverwaltung
- **Apple App Store (optional):** Deployment von iOS-Builds (via TestFlight und App Store) sobald iOS-Support geplant ist
- **Release-Management:** Versionierung, Release Notes und Rollout-Strategien (z. B. Staged Rollout)
- **Automatisierte Builds:** CI/CD-Integration (z. B. via EAS Build oder GitHub Actions) für automatisierte, sichere Production-Builds
- **Code-Signierung:** Produktiv-Zertifikate und sichere Key-Verwaltung für App-Store Signaturen

App-Store Deployment ermöglicht direkte Installation durch Endnutzer ohne technische Barrieren und bietet automatische Updates, Nutzerfeedback und offizielle Distribution.

## 5. Fazit

Die Entwicklung von _Chef's Note_ mit React Native und Expo hat gezeigt, dass die Erstellung von mobilen Anwendungen zwar auf vertrauten Webtechnologien aufbaut, aber dennoch eigenständige Herausforderungen mit sich bringt. Ein zentraler Unterschied zur Web-Entwicklung liegt in der Navigation und dem UI-Stack-Konzept: Anders als in Web-Anwendungen, wo das Browser-Routing und das DOM-Modell zentral sind, erfordert React Native die Verwendung von Stack Navigationssystemen und native Komponenten. Diese neuen Konzepte (wie Expo Router, React Navigation, native StyleSheet API) erforderten Lernaufwand und verzögerten zunächst die Entwicklung, da Team-Mitglieder ihre mentalen Modelle anpassen mussten.

Glücklicherweise bot React und TypeScript eine vertraute Grundlage, die den Übergang erleichterte. Die Geschäftslogik der Anwendung konnte nahezu identisch wie in Web-Projekten implementiert werden: React Hooks für State Management, TypeScript für Typ-Sicherheit und die intuitiven React-Komponenten-Patterns waren unmittelbar übertragbar. Das CSS-ähnliche Styling via React Native StyleSheet fühlte sich natürlich an und ermöglichte schnelle UI-Entwicklung ohne komplexe Native-Code-Ausflüge.

Insgesamt erwies sich dieses Projekt als ausgezeichneter Einstiegspunkt in die native mobile Entwicklung. Die Kombination aus vertrauten Webentwicklungs-Konzepten und neuen, fokussierten mobile-spezifischen Patterns bietet eine sanfte Lernkurve für Web-Entwickler. Mit der gewonnenen Erfahrung und dem durchgearbeiteten Projekt können zukünftige mobile Funktionen schneller und effizienter umgesetzt werden.

## Anhang: Entwicklungsumgebung und Projektstart

Dieser Anhang beschreibt, wie das _Chef's Note_ Expo-Projekt in verschiedenen Umgebungen gestartet wird.

### Voraussetzungen

Bevor Sie das Projekt starten, stellen Sie sicher, dass folgende Software installiert ist:

- **Node.js** (empfohlen: Version 18 oder höher)
- **npm** oder **yarn** (üblicherweise mit Node.js installiert)
- **Expo CLI:** Installation über `npm install -g expo-cli`

### 1. Projekt initialisieren

Führen Sie im Projektverzeichnis folgende Befehle aus:

```bash
# Abhängigkeiten installieren
npm install
# oder
yarn install

# Expo-Projekt starten
npm start
# oder
yarn start
```

Nach dem Start zeigt Expo ein Menü mit verschiedenen Optionen an.

### 2. Android-Emulator

**Voraussetzungen:**
- Android Studio installiert
- Android Virtual Device (AVD) erstellt und konfiguriert

**Projektstart:**

```bash
npm start
```

Im Expo-Menü:
- Drücke `a` um die App im Android-Emulator zu starten
- Alternativ: Stellen Sie sicher, dass der Android-Emulator läuft, und Expo verbindet sich automatisch

Die App wird kompiliert und auf dem emulierten Android-Gerät installiert und gestartet.

### 3. iOS-Simulator (macOS erforderlich)

**Voraussetzungen:**
- macOS mit Xcode installiert
- iOS Simulator verfügbar (über Xcode Command Line Tools)

**Projektstart:**

```bash
npm start
```

Im Expo-Menü:
- Drücke `i` um die App im iOS-Simulator zu starten
- Alternativ: Stellen Sie sicher, dass ein iOS-Simulator läuft, und Expo verbindet sich automatisch

Die App wird kompiliert und im iOS-Simulator gestartet. Der Simulator öffnet sich automatisch, wenn er nicht bereits läuft.

### 4. Web-Browser

**Voraussetzungen:**
- Kein zusätzliches Setup erforderlich

**Projektstart:**

```bash
npm start
```

Im Expo-Menü:
- Drücke `w` um die App im Standard-Web-Browser zu starten
- Alternativ: Öffnen Sie manuell die angezeigte Adresse im Browser

Die App läuft dann im Web-Browser als React Web-Anwendung. Beachten Sie, dass einige mobile-spezifische Features (z. B. native Android/iOS APIs) im Web eingeschränkt sein können.
