///<reference types="cypress" />

describe('Forms Basic screen',()=>{
  it('Page load test',()=>{
    cy.visit('/forms');

    cy.get("[data-cy=username]").should('exist');
  })
 
  it('check fields in form',()=>{
 
    cy.get("[data-cy=pass]").should('exist');
    cy.get("[data-cy=myrange]").should('exist');
    cy.get("[data-cy=myCheck]").should('exist');
    cy.get("[data-cy=mySwitch]").should('exist');
    cy.get("[data-cy=myRadio]").should('exist');
    //cy.get("[data-cy=mySelect]").should('exist');
    cy.get("[data-cy=profileImage]").should('exist');
    cy.get("[data-cy=value1]").should('exist');
    cy.get("[data-cy=value2]").should('exist');
    cy.get("[data-cy=value3]").should('exist');
  })

   it('Insert Username Field ', () => {
        cy.get("[data-cy=username]").should('exist')
        cy.get("[data-cy=username]").type('Naveen')
    })

     it('Insert Password Field ', () => {
        cy.get("[data-cy=pass]").should('exist')
        cy.get("[data-cy=pass]").type('Testing@1100')
    })

     it('Check My Checkbox ', () => {
        cy.get("[data-cy=myCheck]").should('exist')
        cy.get("[data-cy=myCheck]").eq(1).check()
    })

    it('Check My Radio ', () => {
        cy.get("[data-cy=myRadio]").should('exist')
        cy.get("[data-cy=myRadio]").eq(0).check()
    })
 
    it('Value 1 button clicked ', () => {
        cy.get("[data-cy=value1]").should('exist')
        cy.get("[data-cy=value1]").click()
    })

    it('Testing picture uploading', () => {
    // cy.fixture('test-image.jpg').then(fileContent => {
    //     cy.get("[data-cy=profileImage]").attachFile({
    //         fileContent: fileContent.toString(),
    //         fileName: 'test-image.jpg',
    //         mimeType: 'image/jpg'
    //         });
    //     });

        const filepath = 'test-image.jpg'
        cy.get('[data-cy=profileImage]').attachFile(filepath)
       // cy.get('#file-submit').click()
        //cy.get('#uploaded-files').contains('evening.png')

        cy.get(".btn-remove").should('exist');

    });

      it('Pick an option',()=>{
       cy.get("[id='mySelect']").should('exist');
       cy.get("[id='mySelect']").type('Yes')
      .type('{enter}');
      //departments
    });

    it('Verify Submit button', () => {
        cy.get("[data-cy=btn-submit]").should('exist')
        cy.get("[data-cy=btn-submit]").click()
        //  cy.intercept('POST', window.location.origin+'/api/apply', []).as('applyPost')
        //  cy.wait('@applyPost').then((interception) => {
        //     cy.log("helloooooooooo....",interception);
        //     //cy.wait(4000).get("#modal-form-container h2").contains("Application Successful");
        //     //cy.get("#close-form").click()
        // })

       // cy.wait(5000).get("#modal-form-container h2").contains("Application Successful");
        cy.get(".form-error").contains("There was an error");
        
    })


})