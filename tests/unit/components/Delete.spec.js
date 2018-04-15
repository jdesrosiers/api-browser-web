import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Delete from "@/components/Delete.vue";
import { Given, When, Then } from "../test-utils.js";


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
