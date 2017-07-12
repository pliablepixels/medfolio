import { NgModule } from '@angular/core';
import {SearchRecordPipe} from "./search/search-record";
import {SearchCategoryPipe} from "./search/search-category";



@NgModule({
	declarations: [
		SearchRecordPipe,
		SearchCategoryPipe,
	],
	imports: [

	],
	exports: [
		SearchRecordPipe,
		SearchCategoryPipe,
	]
})

export class Pipes { }