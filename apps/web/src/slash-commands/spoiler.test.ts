/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import { describe, it, expect } from "vitest";

import { setUpCommandTest } from "./__mocks__";

describe("/spoiler", () => {
    const roomId = "!room:example.com";

    it("wraps plain text in a spoiler span", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler secret");
        const content = await command.run(client, roomId, null, "secret").promise;
        expect(content?.formatted_body).toBe("<span data-mx-spoiler>secret</span>");
    });

    it("renders markdown inside the spoiler", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler the **secret** plan");
        const content = await command.run(client, roomId, null, "the **secret** plan").promise;
        expect(content?.body).toBe("the **secret** plan");
        expect(content?.formatted_body).toContain("<strong>secret</strong>");
    });
});
