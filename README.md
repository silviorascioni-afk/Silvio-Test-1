# BWT Water Treatment Layout Configurator V1

Interactive React + TypeScript + XYFlow prototype.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## V1 boundaries
- Recommends treatment families, bypass settings and layout topology.
- No flow restriction, pressure-loss or hydraulic sizing calculations.
- Product values in `src/data/catalog.ts` are editable catalogue records. Validate them against current official datasheets before production use.
- Cartridge size is manually selectable because appliance quantity alone does not establish water consumption.

## Deploy
Push to GitHub and import the repository into Vercel, or deploy `dist/` to Azure Static Web Apps.
