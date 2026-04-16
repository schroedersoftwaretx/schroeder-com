Finding Fantasy Value: A Very Early Analysis of Fantasy Football for 2026

 

“How I built an ETL pipeline, made a relational database, wrote regression models, broke them, fixed them, and what I learned”

 

Why?

 

I was invited to join a fantasy league about a year ago with some friends in college. As someone who knew nothing about football, I had to do a lot of research before the draft so I wouldn’t end up facing whatever punishment came with finishing last.

 

Over the past year, I got really into football after realizing just how many statistics are involved. At first, I had no opinions of my own and mostly drafted based on ADP and name recognition. After a year of learning the game, I felt confident enough in my domain knowledge to tackle a data science project around it.

 

Going into this, I knew I wasn’t going to build a perfect model. However, it turned into a really rewarding experience applying data engineering and machine learning concepts to something I genuinely enjoy. The process was more educational than I expected, especially because I had to debug multiple iterations before landing on something that made sense.

 

Fantasy Football Introduction

 

For those unfamiliar with fantasy football, here’s a quick overview:

 

Fantasy football leagues typically use a snake-style draft, where participants take turns selecting NFL players. Teams earn points based on real-life performance—touchdowns, yards, receptions, and dozens of other statistics all contribute to a player’s score.

 

When looking at projected points alone, quarterbacks dominate the leaderboard. However, roster constraints change everything. Since you can only start one quarterback, positional scarcity becomes far more important.

 

A standard 12-team league starts:

\- 1 quarterback

\- 2 running backs

\- 2 wide receivers

\- 1 tight end

\- 2 FLEX (WR/RB/TE)

 

Because of this, positions like running back and wide receiver carry significantly more demand than quarterback.

 

After the draft, roughly:

\- 24 QBs and TEs are rostered

\- 60 RBs and WRs are rostered

 

To compare value across positions, we use Value Over Replacement Player (VORP). VORP measures how much better a player is compared to a freely available “replacement-level” player. A VORP of 0 means you could find an equivalent player on the waiver wire.

 

This metric provides a much clearer picture of player value than raw projected points.

 

Data

 

Data collection was challenging this early in the preseason. I explored several sources, but reliable projections were limited. Fortunately, Sleeper—a fantasy football platform—provides early draft data.

 

From Sleeper, I collected:

\- Average Draft Position (ADP)

\- Projected fantasy points

 

While projections this early aren’t perfectly accurate, they reflect current market sentiment, which is exactly what ADP represents.

 

Database

 

I built a SQLite database and designed the schema beforehand. Compared to using CSV files in previous projects, this approach was:

\- More efficient for storage

\- Easier for querying specific subsets of data

 

Core Metrics

 

This project focuses on two main variables:

1\. ADP (market price)

2\. VORP (true value)

 

The core question:

“Given a player’s ADP, how much VORP should we expect—and who is outperforming or underperforming that expectation?”

 

K-Means Clustering

 

Before evaluating individual players, I wanted to understand the distribution of value.

 

Instead of forcing players into round-based tiers, I used K-Means clustering to identify natural value groupings based on ADP and VORP. This avoided arbitrary cutoffs and helped identify value cliffs.

 

Key observations:

\- Running backs have higher VORP due to scarcity

\- Wide receivers have higher replacement baselines due to depth

\- Quarterbacks, despite high raw scoring, have low relative value

 

Regression Modeling

 

Next, I attempted to model expected value and calculate residuals:

Residual \= Actual VORP – Expected VORP

 

Attempt 1: Linear Regression

 

Linear regression assumes value declines at a constant rate across the draft. However, the data clearly didn’t follow a linear trend.

 

Attempt 2: Polynomial Regression

 

I then tried cubic regression, which initially seemed promising. However, it severely overfit the data—especially at the extremes.

 

This resulted in absurd outputs, such as:

\- Poor-performing players appearing as “elite value”

\- Top-tier players labeled as overvalued

 

This was a textbook example of overfitting.

 

Isotonic Regression

 

Finally, I used isotonic regression, which assumes a monotonic relationship:

As ADP increases, expected VORP decreases.

 

This aligns with how drafts actually work and produced far more realistic results.

 

Findings

 

Undervalued Players:

\- Derrick Henry

\- Garrett Wilson

\- Zay Flowers

 

These players showed significantly higher VORP than expected for their draft position.

 

Overvalued Players:

\- Bucky Irving

\- Kenneth Walker

\- Jaylen Waddle

 

These players were being drafted earlier than their projected value justified.

 

Reflection

 

This model has clear limitations:

\- Only two variables (ADP, VORP)

\- No injury risk modeling

\- No opportunity share metrics

 

However, the process itself was extremely valuable.

 

Key Takeaways:

\- Debugging bad models is more educational than building good ones

\- Model choice should be driven by assumptions, not convenience

\- Domain knowledge is critical in applied data science

 

Next Steps:

\- Incorporate historical data

\- Model variance and risk

\- Add opportunity-based metrics (snap share, target share)

 

Conclusion

 

This project reinforced an important lesson:

Modeling starts with understanding the problem—not just applying algorithms.

 

I’m excited to continue improving this model and revisiting it closer to the season with better data.

 

