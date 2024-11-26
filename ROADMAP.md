# Roadmap

The focus of this initial milestone is to explore product-market fit by:

- Consolidate the current state of Propcorn to make it more solid and usable.
- Promoting the protocol to other open-source projects and validating whether it provides value and can become self-sustaining.

## Development

### Add `cancelProposal` function to return funds to backers

- Contract: Implement a mechanism allowing the proposal creator to cancel an active proposal. This function should return the funds to all backers.
- UI: Implement button.

### Research a `rageQuit` mechanism for contributors

Do research on how we can add a `rageQuit` feature that allows backers to withdraw their contributions if a proposal is significantly deviating from expectations. Not sure if we can implement something already. It needs further investigation. Ideally this should be an open issue in our repo that people can comment.

### Make contract upgradeable

Use `BeaconProxy` pattern to make the contract upgradeable. This allows us to experiment while the project is still small, while later on we can remove it.

### Research deployment on a Polkadot parachain

- Contract: Investigate the feasibility and benefits of deploying Propcorn on a Polkadot parachain. We need to understand the technical requirements and if we are able to deploy EVM contracts easily.
- UI: Investigate which wallets we need to support and what needs to be changed in the front-end code.

### Display all active proposals

- Contract: Add function to list/paginate proposals
- UI: Implement a view that lists all active proposals, showing details like proposal name, associated issue, funding goal, current contributions, and status.

### Optional: filter proposals by wallet address

- UI: Create a filter that enables users to view proposals associated with a specific wallet address. It should also help backers to check if the _proposer_ is legit.

### Improve usability

The current UI is in a _hackathon state_. We need to refresh it a bit without going too crazy.

### Display more information about the GitHub issue in the proposal preview

Right now the proposal only shows a link to the GitHub issue, would be nice to add more info like title, description, status.

### Optional: Research stake requirements for proposal creation to prevent spam

Research how we can add a mechanism where developers need to stake a minimum amount of tokens when creating a proposal to limit spamming and ensures that proposals are created by deeecent devs.

## Leeegals

### Draft privacy policy and terms of use

Create a privacy policy and terms of use that cover how Propcorn handles data, fund handling, and user rights.

## Outreach and Community Engagement

### Contact potential projects interested in trying Propcorn

Identify and reach out to open-source projects that might benefit from micro-funding through Propcorn.

### Gather user feedback

Collect feedback from users after initial use to evaluate how well the protocol addresses the funding gaps for small features. This feedback is crucial to understand if Propcorn makes sense and what we need to improve in order to make it better.
