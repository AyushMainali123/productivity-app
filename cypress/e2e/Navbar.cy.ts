import Navbar from "components/ui/Navbar";

const navOpenHamburger = '[data-testid="drawerOpen-hamburger"]'
const navCloseHamburger = '[data-testid="drawerClose-hamburger"]'

describe("Navbar Drawer test on pc", () => {

    beforeEach(() => {
        cy.viewport(1440, 800)
    })

    it("Opens the drawer on hamburger button click on top-left", () => {
        cy.visit("http://localhost:3000")
        cy.get(navOpenHamburger).click()
    })
})