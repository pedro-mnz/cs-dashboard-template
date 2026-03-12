/**
 * CS Americas Org Data
 * Source: internalfb.com team pages, extracted March 2026
 * Scope: Ceci Seitun's org (CS Americas) under Jimmie Stone
 * Pilot: Americas only
 */

export interface CSPerson {
  name: string;
  role: string;
  manager: string;
  team: string;
}

// All CS Americas people (ICs + managers), sorted alphabetically by name
export const CS_AMERICAS_PEOPLE: CSPerson[] = [
  // Ceci Seitun's direct ICs
  { name: "Ceci Seitun", role: "Director, Head of Creative Shop, Americas", manager: "Jimmie Stone", team: "CS Americas" },
  { name: "Derek Scott", role: "Creative Strategist", manager: "Ceci Seitun", team: "CS Americas" },
  { name: "Gil Chaimovsky", role: "Creative Strategist", manager: "Ceci Seitun", team: "CS Americas" },
  { name: "Marsha Pelia", role: "Creative Strategist", manager: "Ceci Seitun", team: "CS Americas" },
  { name: "Scott Drey", role: "Vertical Lead, Telco", manager: "Ceci Seitun", team: "CS Americas" },

  // Julie Howe's team (Group Lead MV1)
  { name: "Julie Howe", role: "Group Lead MV1, Creative Shop", manager: "Ceci Seitun", team: "CS Americas - MV1" },
  { name: "Allison Brown", role: "Creative Strategist", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Brittany Johnson", role: "Creative Strategist", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Chris Kennedy", role: "Creative Strategist", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Elliott McKnight", role: "Creative Strategist", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Hilary Eden", role: "Creative Strategist, Disruptors", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Jen Barrett", role: "Global Head of Entertainment, Creative Shop", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Nana Bediako", role: "Creative Strategist", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Norah Davis", role: "Contingent Worker", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Rebecca Resnick", role: "Entertainment Creative Strategist - Film and TV", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Seb Mahal", role: "Creative Strategist", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Zoe Sparrow", role: "Creative Strategist", manager: "Julie Howe", team: "CS Americas - MV1" },

  // Elise Davis's team (under Julie Howe)
  { name: "Elise Davis", role: "Manager, Creative Shop", manager: "Julie Howe", team: "CS Americas - Tech, Travel & Gaming" },
  { name: "Bruno Pieroni", role: "Creative Strategist", manager: "Elise Davis", team: "CS Americas - Tech, Travel & Gaming" },
  { name: "Cassidy Cho", role: "Creative Strategist", manager: "Elise Davis", team: "CS Americas - Tech, Travel & Gaming" },
  { name: "Manuel (Chicles) Guillen", role: "Creative Strategist", manager: "Elise Davis", team: "CS Americas - Tech, Travel & Gaming" },
  { name: "Mina Khan", role: "Creative Strategist", manager: "Elise Davis", team: "CS Americas - Tech, Travel & Gaming" },
  { name: "Nicky Veltman", role: "Creative Strategist, Automotive", manager: "Elise Davis", team: "CS Americas - Tech, Travel & Gaming" },
  { name: "Saurabh Kakade", role: "Creative Strategist", manager: "Elise Davis", team: "CS Americas - Tech, Travel & Gaming" },
  { name: "Vinicius Prego", role: "Creative Strategist", manager: "Elise Davis", team: "CS Americas - Tech, Travel & Gaming" },

  // Jake Bruene's team (under Julie Howe)
  { name: "Jake Bruene", role: "Manager, Creative Shop", manager: "Julie Howe", team: "CS Americas - MV1" },
  { name: "Aahana Banker", role: "Creative Strategist", manager: "Jake Bruene", team: "CS Americas - MV1" },
  { name: "Jennifer Park", role: "Creative Strategist", manager: "Jake Bruene", team: "CS Americas - MV1" },
  { name: "Kissa Fernandez", role: "Creative Strategist", manager: "Jake Bruene", team: "CS Americas - MV1" },
  { name: "Megan Elizabeth Concannon", role: "Creative Strategist", manager: "Jake Bruene", team: "CS Americas - MV1" },
  { name: "Ricardo Varela", role: "Creative Strategist", manager: "Jake Bruene", team: "CS Americas - MV1" },

  // Kiki Allen's team (MV2)
  { name: "Kiki Allen", role: "Creative Shop Lead, US - MV2", manager: "Ceci Seitun", team: "CS Americas - MV2" },
  { name: "Abby Alario", role: "Creative Strategist", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Alexandra Tyler", role: "Creative Strategist", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Andrea Campos", role: "Creative Strategist", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Finn Jensen", role: "Creative Strategist", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Greg Hines", role: "Creative Strategist, Specialty Retail", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Mafê Villas Boas", role: "Creative Strategist, Amazon", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Mike Norgard", role: "Creative Strategist", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Shantae Howell", role: "Contingent Worker", manager: "Kiki Allen", team: "CS Americas - MV2" },

  // Steve Golub's team (under Kiki Allen)
  { name: "Steve Golub", role: "Manager, Creative Shop", manager: "Kiki Allen", team: "CS Americas - MV2" },
  { name: "Alicia John", role: "Creative Strategist", manager: "Steve Golub", team: "CS Americas - MV2" },
  { name: "Elouan Le Couteller", role: "Creative Strategist", manager: "Steve Golub", team: "CS Americas - MV2" },
  { name: "Mariana Junger Santelises", role: "Creative Strategist", manager: "Steve Golub", team: "CS Americas - MV2" },
  { name: "Sam Villavicencio", role: "Creative Strategist", manager: "Steve Golub", team: "CS Americas - MV2" },

  // Gustavo Borrmann's team (LATAM)
  { name: "Gustavo Borrmann", role: "Head of Creative Shop LATAM", manager: "Ceci Seitun", team: "CS Americas - LATAM" },
  { name: "Daniela Ryfer", role: "Creative Strategist", manager: "Gustavo Borrmann", team: "CS Americas - LATAM" },
  { name: "Héctor Herrera", role: "Creative Strategist", manager: "Gustavo Borrmann", team: "CS Americas - LATAM" },
  { name: "Jackeline Salomão", role: "Creative Strategist", manager: "Gustavo Borrmann", team: "CS Americas - LATAM" },
  { name: "Nat Villegas", role: "Creative Strategist, South Cone", manager: "Gustavo Borrmann", team: "CS Americas - LATAM" },
  { name: "Pedro Menezes", role: "Creative Strategist", manager: "Gustavo Borrmann", team: "CS Americas - LATAM" },
  { name: "Raquel Stein Barcellos Guimarães", role: "Creative Strategist", manager: "Gustavo Borrmann", team: "CS Americas - LATAM" },
  { name: "Roberto Espino", role: "Creative Strategist", manager: "Gustavo Borrmann", team: "CS Americas - LATAM" },
].sort((a, b) => a.name.localeCompare(b.name));

// All unique manager names for the manager autocomplete field
export const CS_AMERICAS_MANAGERS: string[] = Array.from(
  new Set(CS_AMERICAS_PEOPLE.map((p) => p.manager))
).sort();

// All unique people names for the name autocomplete field
export const CS_AMERICAS_NAMES: string[] = CS_AMERICAS_PEOPLE.map((p) => p.name).sort();

/**
 * Given a person's name, return their manager name (for auto-fill)
 */
export function getManagerForPerson(name: string): string | undefined {
  const person = CS_AMERICAS_PEOPLE.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  return person?.manager;
}

/**
 * Given a person's name, return their team name (for auto-fill)
 */
export function getTeamForPerson(name: string): string | undefined {
  const person = CS_AMERICAS_PEOPLE.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  return person?.team;
}
