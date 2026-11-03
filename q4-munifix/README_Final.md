4.3 Test record

Test 1: Normal case
Action: Tap "Open (tap to resolve)" on the Pothole report.
Expected result: The card turns green, the button says Resolved, and the open-report counter drops by 1.
Observed result: The card turned green, the label changed to Resolved, and the counter went from 4 to 3.
Result: Pass

Test 2: Validation / edge case
Action: Resolve every report, then reopen one.
Expected result:** The counter shows 0 when all are resolved, then 1 after reopening one, with no crash.
Observed result: The counter showed 0 with all cards green, then 1 after reopening one. No crash.
Result: Pass

Test 3: Persistence / state case
Action: Toggle only the Streetlight report, then scroll up and down the list.
Expected result: Only that report changes. All other reports keep their state.
Observed result: Only that card changed, the others stayed the same, and the counter matched the number of open cards.
Result: Pass

Test 4: Regression case (repaired defect)
Action: Reload the app, then tap one card once.
Expected result:Nothing toggles on load. One tap toggles exactly one report, and the animation does not replay.
Observed result:Nothing toggled on load (counter was 4). One tap changed one card, with no fade replay.
Result: Pass




4.4 Expo release preparation

The configuration is in 'app.json' :

App name: MuniFix SA
Slug: munifix-sa
Version: 1.0.0
Android package identifier: za.co.munifix.app



4.5 Stakeholder demonstration and peer-review response

The South African problem is poor ,unicipal service delivery.

The target user is residents who want an easy way to report and track issues.

The three main features are reporting problems, viewing report details and updatind the statuss from 'Open ' to 'Resolved'. Users can also see how many reports are still open.

One limitation is that the app does not yet store reports in a live municipal database

