import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then } from "@/../tests/unit/test-utils.js";
import Delete from "@/components/Document/components/Delete.vue";


Given("a Delete", () => {
  When("it is clicked", () => {
    let del;

    beforeEach(() => {
      del = mount(Delete, {
        propsData: {
          browser: {
            status: 200,
            headers: {}
          }
        }
      });

      del.trigger("click");
    });

    Then("it should emit a click event", () => {
      expect(del.emitted().click.length).to.eql(1);
    });
  });
});
