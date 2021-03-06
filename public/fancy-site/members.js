
export class MembersPage extends SugarElement {
	// must be associated with group
	render() {
		if(!this.parent || !this.parent.id) throw "must have a parent"
		return htmlify`
			<sugar-page>
				<sugar-content>
					<h1>Group: ${this.parent.title}</h1>
					<sugar-card artifact=${this.parent}></sugar-card>
					<h3>Members in this group:</h3>
					<a href="/group/${this.parent.id}/member/create">[Create a new member in this group]</a>
					<br/>
					<sugar-collection
						observe=${Services.db.observe.bind(Services.db)}
						query=${{table:"member",parentid:this.parent.id}}
						card="sugar-card">
					</sugar-collection>
				</sugar-content>
			</sugar-page>
			`
	}
}
customElements.define('members-page', MembersPage )


export class MemberDetailPage extends SugarElement {
	static defaults = {
		subject:0 // if subject changes then force update
	}
	render() {
		if(!this.parent || !this.parent.id) throw "must have a parent"
		if(!this.subject || !this.subject.id) throw "must exist"
		let parentid = this.parent.id
		let id = this.subject.id

		return htmlify`
			<sugar-page>
				<sugar-content>
					<h1>Member: ${this.subject.title}</h1>
					<sugar-card artifact=${this.subject}></sugar-card>
					<a href="/group/${parentid}/member/${id}/edit">[Edit this member]</a>
					<br/>
					<h3>Permissions on this member:</h3>
					<sugar-collection
						observe=${Services.db.observe.bind(Services.db)}
						query=${{table:"permissions",parentid:id}}
						card="sugar-card">
					</sugar-collection>
				</sugar-content>
			</sugar-page>
			`
	}
}
customElements.define('member-detail-page', MemberDetailPage )


///
/// Caller is expected to inject a subject
///

export class MemberEditPage extends SugarElement {
	static defaults = {
		subject:0 // if subject changes then force update
	}
	render() {

		let subject = this.subject
		if(!subject) subject = {table:"member",parentid:this.parent.id}

		let schema = {
			id:     {rule:"id",       },
			title:  {rule:"string",   label:"Title"  },
			profile:  {rule:"string",    label:"Link to Profile"},
			submit: {rule:"submit",   label:"Submit" },
			remove: {rule:"remove",   label:"Delete" },
			cancel: {rule:"cancel",   label:"Cancel" },
		}

		let submit = async (subject) => {
			let result = await Services.db.post(subject)
			if(result && result.id) {
				window.history.pushState({},result.volatile.url,result.volatile.url)
			} else {
				alert("Could not post!")
			}
		}


		let permissions = [

		"May edit group",
		"May add activities",
		"May edit activities",
		"May delete activity",
		"May add members",
		"May edit members",
		"May remove members",

		"Is silenced",
		"Is immobilized",
		"Is not teleportable",
		"Is blocking person",
		"Has color [color picker]",

		"May edit activity # ",
		"May fly in activity # ",
		"May teleport in activity # ",
		"May use megaphone in activity # ",
		"May kick people from activity # ",
		"May add or remove objects from activity # ",
		"May elevate permissions in activity # ",

		"May silence people in activity #",

		]

		let str = ""
		permissions.forEach(p=> {
			str += `<a href=''>${p}</a><br/>`
		})

		return htmlify`
			<sugar-page>
				<sugar-content>
					<h1>${subject.id?"Edit":"Create"} Member</h1>
					<sugar-form subject=${subject} schema=${schema} submit=${submit}></sugar-form>
					<h3>Member Permissions in this Group</h3>
					<div>
						${str}
					</div>
				</sugar-content>
			</sugar-page>`
	}
}

customElements.define('member-edit-page', MemberEditPage )
