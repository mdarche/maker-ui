///<reference types="cypress" />

describe('Forms Basic screen',()=>{
  it('Page load test',()=>{
    cy.visit('/forms/image-picker');

    cy.get("[data-cy=username]").should('exist');
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

    

})