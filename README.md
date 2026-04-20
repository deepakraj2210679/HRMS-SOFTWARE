You are an expert in ExtJS and Angular (latest version).

Your task is to convert the provided ExtJS code into Angular while strictly preserving functionality, business logic, and behavior.

🔒 STRICT RULES:

1. DO NOT change any business logic, conditions, calculations, or API calls.
2. DO NOT simplify or optimize logic unless explicitly asked.
3. Maintain the same flow, event handling, and data transformations.
4. Preserve variable names where possible for traceability.
5. If something cannot be directly mapped, explain and provide the closest Angular equivalent.

---

🔁 CONVERSION MAPPING RULES:

- Ext.define → Angular Component / Service / Module
- Ext.grid.Panel → Angular table (HTML + TS logic)
- Ext.form.Panel → Angular Reactive Form
- Ext.data.Store → Angular Service (HttpClient / RxJS)
- listeners → Angular event bindings
- handler functions → Component methods
- controller → Component / Service separation
- ViewModel → Component state / RxJS / Signals

---

📂 OUTPUT STRUCTURE:

Provide output in this exact structure:

1. Angular Component (.ts)
2. HTML Template (.html)
3. Service (if store/API exists)
4. Interfaces/Models (if needed)
5. Explanation of mapping (ONLY if necessary)

---

⚠️ EDGE CASE HANDLING:

- If ExtJS uses dynamic configs, replicate using Angular inputs or services.
- If store has proxy/API → use HttpClient
- If complex UI (grid with renderers) → preserve logic in TS functions

---

📥 INPUT:

<PASTE EXTJS CODE HERE>---

📤 OUTPUT:

Provide complete Angular code ready to use.





You are an expert in ExtJS (Sencha Architect, Ext JS 7.x) and Angular (v16+).

I will provide one or more ExtJS files. These files may include:

- Controllers (including override controllers)
- Models
- Stores
- Views (Viewport, Panel, Grid, Form)
- Application bootstrap (app.js)

---

🎯 TASK

Analyze the given ExtJS code dynamically and convert it into Angular.

---

⚠️ IMPORTANT INSTRUCTIONS

1. DO NOT depend on file names

2. Identify file type based on content:
   
   - If it contains Ext.define + extend: 'Ext.app.Controller' → Controller
   - If it contains fields → Model
   - If it contains extend: 'Ext.data.Store' → Store
   - If it contains xtype/layout → View

3. Preserve:
   
   - Business logic
   - API calls
   - Timers (setInterval)
   - Data transformations
   - Conditional flows

---

🔁 DYNAMIC MAPPING RULES

Controller Detection

If file contains:
Ext.app.Controller

→ Convert to:

- Angular Component (UI logic)
- Angular Service (shared/API logic)

Map:

- afterrender → ngOnInit / ngAfterViewInit
- control events → Angular event bindings

---

Store Detection

If file contains:
Ext.data.Store

→ Convert to Angular Service:

- Use BehaviorSubject for state
- Use HttpClient for API calls

---

Model Detection

If file contains:
fields: []

→ Convert to TypeScript interface

---

View Detection

If file contains:
xtype / layout / items

→ Convert to Angular HTML template

Mapping:

- gridpanel → HTML table or Angular Material table
- hbox/vbox → Flexbox
- panel → div/container

---

Override Detection

If file contains:
override:

→ Convert using:

- Angular inheritance OR
- Shared service injection

---

🔍 SPECIAL CASE HANDLING

- Ext.getStorage() → localStorage
- Ext.Date → JavaScript Date
- Ext.isEmpty → null/undefined check
- Renderer functions → Angular template methods

---

📦 OUTPUT FORMAT

Generate:

1. model (if applicable)
2. service (if applicable)
3. component (ts + html + css)

---

🧠 BEHAVIOR

- Detect structure automatically
- Do NOT assume file names
- Keep logic intact
- Add comments explaining mapping

---

📥 INPUT

(ExtJS code will be provided)

---

📤 OUTPUT

Clean Angular implementation
