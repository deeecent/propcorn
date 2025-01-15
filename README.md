# 🍿 Propcorn 🍿

_A public good for micro-funding small features_

## Contributing to Propcorn

### Prerequisites

We use [Bun](https://bun.sh/), a modern JavaScript runtime. If you're new to Bun, you'll love its speed and simplicity.

```
# If you don't have Bun installed, get it from https://bun.sh/
curl -fsSL https://bun.sh/install | bash
```

### Steps to Contribute

1. Fork the repository: click the "Fork" button at the top of this page to create your fork.
2. Set up your environment

   ```
   # Clone your fork of the repository
   git clone https://github.com/<your-username>/propcorn

   # Navigate to the project directory
   cd propcorn

   # Set up the environment for the frontend
   cd web
   cp env.template .env

   # Edit the `.env` file to add the endpoint to connect to Sepolia (a test network)
   # if you need endpoints ping us at https://t.me/propcornprotocol

   # Install dependencies
   bun install

   # Start the frontend locally
   bun run dev
   ```

3. Once you are done with your changes, make a pull request.

### How to Make a Proposal

1. Go to [Propcorn](https://propcorn.xyz/).
2. Click Create New Proposal.
3. Connect your wallet.
   - GitHub Issue Link: Add the link to the issue you want to work on.
   - Amount in ETH: Enter the amount you consider appropriate for the task.
   - Delivery Time: Specify a reasonable delivery time.
4. Adjust the Protocol Fee as you see fit. Feel free to include the network fee in your calculations to ensure the amount works for you.
5. Click Submit.
6. Once you receive the proposal link, post it back to the issue you want to work on using this template. (Note: We are working on automating this step soon!)

   ```
   ### 🍿 This issue is being proposed on Propcorn

   Help fund this task to support its development and ensure its completion! [View on Propcorn](<PROPOSAL-URL>)
   - ⏱️ Duration: ?? days
   - 💰 Amount: ?? ETH
   ```

> [!NOTE]  
> Submitting a proposal does not guarantee funding. Proposals are evaluated on a case-by-case basis. Additionally, we have a [limited budget](https://optimistic.etherscan.io/address/0xF1916936dDB48a40f833743555bB0D874a25e07f), so we need to allocate resources carefully. For any questions or to discuss your ideas, feel free to join our [Telegram Community](https://t.me/propcornprotocol). It's always better to discuss things in advance.

## TL;DR

Propcorn is a public good designed to incentivize open-source developers by enabling micro-funding for small features or fixes on GitHub. It allows developers to create proposals for issues they find interesting, set a price, and share the link to gather funding from the community. Once the funding goal is met, the funds are released to the developer after a waiting period, ensuring community approval. Propcorn is simple on purpose, focusing only on micro-funding for small development tasks.

## Problem

Currently, there is little incentive for external contributors to fix issues on GitHub. Core maintaners often have this responsibility but they manage already a significant workload with specific priorities. Freelancers or developers with the necessary skills may want to help, but they often can’t justify the time investment without compensation.

## Solution

Propcorn is a micro-funding public good where developers can propose and fund fixes for GitHub issues. Here’s how it work:

- A developer finds an interesting issue on GitHub and creates a proposal on the platform, linking it to the issue and setting a price tag.
- The developer shares this proposal via social media, encouraging others to sponsor the fix or feature with cryptocurrency.
- Anyone can contribute until the funding goal is reached.
- Once the issue is resolved, the developer marks the proposal as “solved” on the platform.
- After a 10-day waiting period (during which sponsors can raise objections), the funds are automatically released to the developer, unless a significant percentage of sponsors veto the payout.
- The platform provider takes a small fee for facilitating this process.

This approach creates a mini-DAO for each issue, enabling flexible, community-driven funding and development. The platform can be used anywhere, such as on GitHub or Twitter, and can even fund its own development through the same process.

## Notes

There are other similar platforms:

- https://gitcoin.co/
- https://app.onlydust.com/
- https://octant.app/projects
- https://clr.fund/

Propcorn is different because it's just a simple protocol that does one simple thing: micro-funding for small features. Just connect with your wallet, create a proposal and share a link, or fund it.
