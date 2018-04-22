import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then } from "@/../tests/unit/test-utils.js";
import Cancel from "@/components/Document/components/Cancel.vue";


Given("a Cancel", () => {
  When("it is clicked", () => {
    let cancel;

    beforeEach(() => {
      cancel = mount(Cancel, {
        propsData: {
          browser: {
            status: 200,
            headers: {}
          }
        }
      });

      cancel.trigger("click");
    });

    Then("it should emit a click event", () => {
      expect(cancel.emitted().click.length).to.eql(1);
    });
  });
});
