import { Components } from "../support/components"
import { dataCy } from "../support/generics"


class ConsultantForm implements Components.ISetup{
    
    nameField: Components.TextField
    surnameField: Components.TextField
    emailField: Components.TextField
    phoneField: Components.TextField
    buttonElement: Components.LazyChainableElement
    
    setup(): Cypress.Chainable<JQuery<HTMLElement>> {

        return cy.then(() => {
            this.nameField = new Components.TextField(
                () =>  cy.get(dataCy('name-form'), { log: false })
            )
            this.surnameField = new Components.TextField(
                () =>  cy.get(dataCy('surname-form'), { log: false })
            )
            this.emailField = new Components.TextField(
                () =>  cy.get(dataCy('email-form'), { log: false })
            )
            this.phoneField = new Components.TextField(
                () =>  cy.get(dataCy('phone-form'), { log: false })
            )
            this.buttonElement = new Components.LazyChainableElement(
                () => cy.get(dataCy('submit-form'), { log: false })
            )
        })
    }

    
}


describe('Exercise FidoConsultant', () => {

    beforeEach('Vai al sito', () => {
        cy.intercept("GET", "**/consultant", { log: false }).as("getConsultants")
        cy.visit('/')
        cy.wait('@getConsultants')
    })

    describe('modifica consulente', () => {
        beforeEach('clicca sul bottone edit', () => {
            cy.get(dataCy('edit-consultant'))
                .first()
                .click()
        })
    
        it('prendi e modifica i dati dei campi', () => {
            
            let consultantForm = new ConsultantForm ()
            consultantForm.setup().then(() => {

                consultantForm.nameField.clear()
                consultantForm.nameField.fill('Mario')
    
                consultantForm.surnameField.clear()
                consultantForm.surnameField.fill('Rossi')
    
                consultantForm.emailField.clear()
                consultantForm.emailField.fill('mariorossi@test.it')
    
                consultantForm.phoneField.clear()
                consultantForm.phoneField.fill('3456728990')
    
                consultantForm.buttonElement.element.click()
            })
        })
    })
})