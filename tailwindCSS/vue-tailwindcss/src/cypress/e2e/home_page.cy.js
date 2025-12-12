/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8080/login') 
    cy.get('div[class^="el-input"] > input');
    cy.get('input[type="text"]').type('admin'); 
    cy.get('input[type="password"]').type('1234');
    
    cy.intercept('POST', '/api/authentication/login').as('loginRequest'); 
    cy.contains('button','登入').click(); 
    cy.wait('@loginRequest').then((inter) => {
      cy.log(inter.response.statusCode); 
      if (inter.response.statusCode === 200) {
        cy.log('Success'); 
      } else {
        cy.log('Failed'); 
      }
    });
  })


  // 3. 点击登录按钮
  // it('should submit the login form', () => {
  //   cy.contains('button','登入').click(); // 替换为登录按钮的选择器
  // });

  // 4. 检查登录结果
  // it('should show success or failed message based on login result', () => {
  //   cy.intercept('POST', '/api/login').as('loginRequest'); // 替换为后端登录 API 的 URL
  //   cy.wait('@loginRequest').then((interception) => {
  //     if (interception.response.statusCode === 200) {
  //       cy.contains('Success').should('be.visible'); // 替换为成功登录时显示的文字
  //     } else {
  //       cy.contains('Failed').should('be.visible'); // 替换为登录失败时显示的文字
  //     }
  //   });
  // })
})