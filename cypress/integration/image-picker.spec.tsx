///<reference types="cypress" />

describe('Forms Basic screen',()=>{
  it('Page load test',()=>{
    cy.visit('/forms/image-picker');

    cy.get("[data-cy=myImage]").should('exist');
  })
 
  

    it('Testing picture uploading', () => {

        const filepath = 'test-image.jpg'
        cy.get('.hidden').attachFile(filepath)
       // cy.get('#file-submit').click()
        //cy.get('#uploaded-files').contains('evening.png')

        cy.get(".btn-remove").should('exist');

    });    

})