# AI Formatting & Style Instructions

When an AI is tasked with generating or rewriting walkthroughs for this project hub, it must strictly adhere to the following stylistic guidelines to match the author's distinct "MacGyver" maker voice.

## 1. Structure & Tone (English)
- **Direct & functional:** Focus on what was built, how it works, and the physical challenges. No fluff.
- **Tone:** Casual, slightly informal engineering tone. Never use overly enthusiastic or PR-speak phrases (e.g., "I embarked on an exciting journey...").
- **Formatting Rules:**
  - Standardize lists with em-dashes instead of colons (e.g. `- **Microcontroller** — An ESP32-S3 hosts the firmware...`).
  - **No emojis** anywhere in the Markdown content.
  - Descriptions inside `metadata.json` must end with a period.

## 2. Localization & Translation (Quebec French)
When writing or translating the project into `content_fr.md`, you must adopt a highly localized, casual Quebecois engineering voice. Do **not** use formal, textbook European French.

### Key Stylistic Directives:
- **Colloquial Expressions:** Use standard Quebec idioms.
  - *Example:* If something breaks or draws poorly, describe it as **"tout croche"**.
  - *Example:* A "weekend" is a **"fin de semaine"**, never a "week-end".
  - *Example:* A "party trick" translates fluidly to a **"tour de magie"**.
- **Anglicisms & Engineering Calques:** Do not over-translate technical terms if they sound unnatural. Calques like **"kinématique inverse"** are perfectly acceptable and preferred over textbook equivalents. 
- **Spelling & Pacing Quirks:** The author types fast and phonetically. While the AI should format cleanly, preserve the relaxed, conversational grammar. (e.g., *Meme si c'est un prototype complètement fonctionelle... le robot es vraiment lent et desfois dessinne tout croche si pas bien callibrée*).
- **Vocabulary Mapping:**
  - "software/computing" -> "informatique / logiciel"
  - "motors" -> "moteures"
  - "length" -> "longeure"
  - "coordinated" -> "coordonées"

> **AI Note:** When in doubt for French translations, err on the side of conversational hardware hacking in a garage in Montreal, rather than a lecture at the Sorbonne.
