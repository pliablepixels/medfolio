import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

import { AppModule } from './app.module';

console.log ("main.ts");
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
