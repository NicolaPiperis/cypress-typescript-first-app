
import { Lazy } from "./core/lazy"

export namespace Components {

    export interface ISetup {
        setup(): Cypress.Chainable<JQuery<HTMLElement>>
    }

    export class ChainableElement<T = JQuery<HTMLElement> | undefined> {

        protected _element: T

        constructor(element: T) {
            this._element = element
        }

        public get element(): Cypress.Chainable<T> {
            return cy.wrap(this._element, { log: false })
        }

    }

    export class LazyChainableElement extends ChainableElement {

        protected _lazy: Lazy<Cypress.Chainable<JQuery<HTMLElement>>>

        constructor(lazyFn: () => Cypress.Chainable<JQuery<HTMLElement>>) {
            super(undefined)
            this._lazy = new Lazy(lazyFn)
        }

        public override get element(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.then(() => {
                if (!this._element) {
                    return this._lazy
                        .value
                        .should('exist')
                        .then((element) => {
                            this._element = element
                            return this.element
                        })
                }
                return cy.wrap(this._element, { log: false })
            }).scrollIntoView({ log: false })
        }

    }

    export class TextField extends LazyChainableElement {
        fill(value: string): Cypress.Chainable<TextField> {
            return cy.then(() => {
                this.element
                    .type(value, { log: false }).then(() => {
                        return cy.wrap(this, { log: false })
                    })
            })
        }

        clear(): Cypress.Chainable<TextField> {
            return cy.then(() => {
                return this.element
                    .type('{moveToStart}{selectall}{backspace}', { log: false }).then(() => {
                        return cy.wrap(this, { log: false })
                    })
            })
        }
    }

    export class SlideToggleField extends LazyChainableElement {
        toggle(value: boolean): SlideToggleField {
            this.element
                .find('button', { log: false })
                .then((element) => {
                    cy.wrap(element, { log: false })
                        .invoke({ log: false }, 'attr', 'aria-checked')
                        .then((ariaCheckedValue) => {
                            let checked = ariaCheckedValue === 'true'
                            if (checked !== value) {
                                cy.wrap(element, { log: false }).click({ log: false })
                            }
                        })
                })
            return this
        }
    }

    export class ToggleGroupField<T = string> extends LazyChainableElement {
        toggle(value: T): ToggleGroupField<T> {
            this.element
                .contains(<string>value, { log: false, matchCase: false })
                .click({ log: false })
            return this
        }
    }

    export class DropdownField extends LazyChainableElement {
        select(option: string): DropdownField {
            this.element
                .click({ log: false })
                .get('mat-option', { withinSubject: null, log: false })
                .contains(option, { matchCase: false, log: false })
                .click({ log: false })
            return this
        }
    }

    export class DropdownEditableField<T = string> extends LazyChainableElement {
        select(option: T): DropdownEditableField<T> {
            this.element
                .click({ log: false })
                .type('{selectall}{backspace}', { log: false })
                .type(<string>option, { log: false })
                .get('mat-option', { withinSubject: null, log: false })
                .contains(<string>option, { matchCase: false, log: false })
                .click({ log: false })
            return this
        }
    }

    export class CheckBox extends LazyChainableElement {

        toggle(value: boolean) {
            this._setValueIfNotSelected(value)
        }

        private _setValueIfNotSelected(value: boolean) {
            this.element
                .invoke({ log: false }, 'attr', 'ng-reflect-checked').then((checked) => {
                    let booleanChecked = checked.toLowerCase() == 'true'
                    if (booleanChecked != value) {
                        this.element
                            .children({ log: false })
                            .should('have.class', 'fido-checkbox-container')
                            .click({ log: false })
                    }
                })
        }

    }

}