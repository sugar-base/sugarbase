
export class GroupsPage extends SugarElement {
	render() {
		return htmlify`
			<sugar-page>
				<sugar-content>
					<h1>List of Groups</h1>
					<a href="/group/edit">Create a Group now</a>
					<sugar-collection
						observe=${Services.db.observe.bind(Services.db)}
						query=${{table:"group"}}
						card="sugar-card">
					</sugar-collection>
				</sugar-content>
			</sugar-page>`
	}
}
customElements.define('groups-page', GroupsPage )

export class GroupDetailPage extends SugarElement {
	render() {
		return htmlify`
			<sugar-page>
				<sugar-content>
					<h1>Detail on a Group</h1>
					<a href="/group/edit/1234">Link to edit this group</a>
					<br/>
					<a href="/members/1234">link to members of this group</a>
					<br/>
					<h1>Events in Group</h1>
					<sugar-collection
						observe=${Services.db.observe.bind(Services.db)}
						query=${{table:"event"}}
						card="sugar-card">
					</sugar-collection>
					<br/>
				</sugar-content>
			</sugar-page>`
	}
}
customElements.define('group-detail-page', GroupDetailPage )


export class GroupEditPage extends SugarElement {
	render() {

		let subject = {
			id:0,
			table:"group",
			title:"Sun sky",
			url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/1920px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
			image:"my image"
		}

		let schema = {
			id:     {rule:"id",       },
			title:  {rule:"string",   },
			url:    {rule:"string",   },
			image:  {rule:"image",    },
			map:    {rule:"map",      },
			descr:  {rule:"textarea", },
			start:  {rule:"date",     },
			end:    {rule:"date",     },
			submit: {rule:"submit",   },
			remove: {rule:"remove",   },
			cancel: {rule:"cancel",   },
		}

		return htmlify`
			<sugar-page>
				<sugar-content>
					<h1>Group Edit</h1>
					<sugar-form subject=${subject} schema=${schema}></sugar-form>
				</sugar-content>
			</sugar-page>`
	}
}
customElements.define('group-edit-page', GroupEditPage )
