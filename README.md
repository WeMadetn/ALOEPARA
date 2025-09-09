# AloePara - E-commerce Parapharmacie

AloePara est une application e-commerce moderne développée avec Angular 20, spécialisée dans la vente de produits parapharmaceutiques et de santé. Le projet s'inspire du design et de l'expérience utilisateur d'edenpharma.tn.

## 🚀 Fonctionnalités

### Page d'accueil complète
- **Header responsive** avec logo, navigation et barre de recherche
- **Menu burger** pour mobile avec navigation fluide
- **Slider/Banner principal** avec images défilantes et call-to-actions
- **Section catégories** avec cartes interactives et animations
- **Produits populaires** avec système de notation et panier
- **Footer complet** avec informations de contact et liens utiles

### Design et UX
- **Design responsive** optimisé pour desktop, tablette et mobile
- **Thème médical/parapharmaceutique** avec couleurs appropriées
- **Animations CSS** fluides et modernes
- **Accessibilité** respectée avec ARIA labels
- **Performance optimisée** avec lazy loading

### Technologies utilisées
- **Angular 20** avec Standalone Components
- **Bootstrap 5** pour le système de grille responsive
- **Font Awesome** pour les icônes
- **Angular Material** pour les composants UI avancés
- **TypeScript** pour le typage fort
- **CSS3** avec variables personnalisées et animations

## 📁 Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── header/           # Header avec navigation
│   │   ├── slider/           # Slider principal
│   │   ├── categories/       # Section catégories
│   │   ├── products/         # Produits populaires
│   │   └── footer/           # Footer
│   ├── pages/
│   │   └── home/             # Page d'accueil
│   ├── shared/
│   │   ├── models/           # Modèles TypeScript
│   │   └── services/         # Services Angular
│   └── assets/
│       └── images/           # Images et logos
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
