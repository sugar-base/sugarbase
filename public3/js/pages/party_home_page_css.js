
class PartyHomePage extends HTMLElement {
	componentWillShow() {
		this.className="page"

		let moniker = window.appstate.currentParty ? window.appstate.currentParty.moniker : 0

		this.innerHTML =
			`
			<div class='subpage' style="background:rgba(255,255,255,0.7);font-size:2em;">
				<h1>You are ${moniker?"":"not"} logged in</h1>
				<br/>
				Actions you may take here:
				<ul>
					<li><a class="bigbutton" href="/">go to home page</a>
					<li><a class="bigbutton" href="/party">go to your page</a>
					<li><a class="bigbutton" href="/party/signout">go to signout</a>
				</ul>
			</div>
			`

		// note: this page could look at the system state to determine if the user is logged in or not
		// note: this page could also choose to only paint itself on state changes
	}
}

customElements.define('party-home-page', PartyHomePage )

router.add("party", "party-home-page")
