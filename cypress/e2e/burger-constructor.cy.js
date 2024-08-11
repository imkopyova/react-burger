describe('burger-constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', 'ingredients', { fixture: 'ingredients.json' });
        cy.intercept('POST', 'orders', { fixture: 'order.json' });
        cy.intercept('POST', 'login', { fixture: 'user.json' });

        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken'),
        );
    });
    it('should drug bun', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="draggable-bun"] > a')
            .first()
            .trigger('dragstart');
        cy.get('[data-testid="ingredient-stub-bun-top"]').trigger('drop');
        cy.get('[data-testid="constructor-element-bun-top"]').should('exist');
        cy.get('[data-testid="constructor-element-bun-bottom"]').should(
            'exist',
        );
    });
    it('should drug ingredients', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="draggable-sause"] > a')
            .first()
            .trigger('dragstart');
        cy.get('[data-testid="ingredient-stub"]').trigger('drop');
        cy.get('[data-testid="draggable-sause"] > a')
            .eq(1)
            .trigger('dragstart');
        cy.get('[data-testid="ingredient-stub"]').trigger('drop');

        cy.get('[data-testid="constructor-element-ingredient"]').should(
            'have.length',
            2,
        );
    });

    it('should open modal', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="draggable-bun"] > a').first().click();
        cy.get('[data-testid="ingredient-modal"]').first().should('be.visible');
    });
    it('should close modal on overlay click', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="draggable-bun"] > a').first().click();
        cy.get('[data-testid="ingredient-modal"]').first().should('be.visible');
        cy.get('[data-testid="modal-overlay"]').first().click({ force: true });
        cy.get('[data-testid="ingredient-modal"]').should('not.exist');
    });
    it('should close modal on button click', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid="draggable-bun"] > a').first().click();
        cy.get('[data-testid="ingredient-modal"]').first().should('be.visible');
        cy.get('[data-testid="modal-close"]').first().click();
        cy.get('[data-testid="ingredient-modal"]').should('not.exist');
    });
    it('should make order', () => {
        cy.visit('http://localhost:3000/');

        cy.get('[data-testid="draggable-bun"] > a')
            .first()
            .trigger('dragstart');
        cy.get('[data-testid="ingredient-stub-bun-top"]').trigger('drop');
        cy.get('[data-testid="draggable-sause"] > a')
            .first()
            .trigger('dragstart');
        cy.get('[data-testid="ingredient-stub"]').trigger('drop');

        cy.get('[data-testid="make-order-button"] > button').first().click();
        cy.get('[data-testid="login-page"]').should('be.visible');
        cy.get('[data-testid=email-input] input').type(`test@mail.com`);
        cy.get('[data-testid=password-input] input').type(`12334fdgfg`);
        cy.get('[data-testid=login-button] > button').click();

        cy.get('[data-testid="make-order-button"] > button').first().click();
        cy.get('[data-testid="order-details"]').should('exist');
        cy.get('[data-testid="order-details"] > h3').should(
            'contain.text',
            '48958',
        );
    });
});
