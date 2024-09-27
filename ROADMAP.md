# Roadmap

The focus of this initial milestone is to explore product-market fit by:

- Consolidate the current state of Propcorn to make it more solid and usable.
- Promoting the protocol to other open-source projects and validating whether it provides value and can become self-sustaining.

## Contract

### Add `cancelProposal` function to return funds to backers

Implement a mechanism allowing the proposal creator to cancel an active proposal. This function should return the funds to all backers.

### Research a `rageQuit` mechanism for contributors

Do research on how we can add a `rageQuit` feature that allows backers to withdraw their contributions if a proposal is significantly deviating from expectations. Not sure if we can implement something already. It needs further investigation.

## UI

### Display all active proposals

Implement a view that lists all active proposals, showing details like proposal name, associated issue, funding goal, current contributions, and status.

### Filter proposals by wallet address

Create a filter that enables users to view proposals associated with a specific wallet address. It should also help backers to check if the _proposer_ is legit.

### Improve usability

The current UI is in a _hackathon state_. We need to refresh it a bit without going too crazy.

## Outreach and Community Engagement

### Contact potential projects intersted in trying Propcorn

Identify and reach out to open-source projects that might benefit from micro-funding through Propcorn.

### Gather user feedback

Collect feedback from users after initial use to evaluate how well the protocol addresses the funding gaps for small features. This feedback is crucial to understand if Propcorn makes sense and what we need to improve in order to make it better.

### Research deployment on a Polkadot parachain

Investigate the feasibility and benefits of deploying Propcorn on a Polkadot parachain. We need to understand the technical requirements and if we are able to deploy EVM contracts easily.

## Leeegals

### Draft privacy policy and terms of use

Create a privacy policy and terms of use that cover how Propcorn handles data, fund handling, and user rights.

## Extras

### Anti-Spam Measures

## Research stake requirements for proposal creation

Research how we can add a mechanism where developers need to stake a minimum amount of tokens when creating a proposal to limit spamming and ensures that proposals are created by deeecent devs.
