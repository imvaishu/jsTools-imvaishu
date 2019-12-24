const chai = require("chai");
const assert = chai.assert;
const { parseUsrOptions, head, showResult } = require("../src/headLib");

describe("headLib", function() {
  describe("parseUsrOptions", function() {
    it("should parse commandLine arguments if only filename is given", function() {
      const args = ["path"];
      const actualValue = parseUsrOptions(args);
      const expectedValue = {
        fileName: "path",
        start: 0,
        end: 10
      };

      assert.deepStrictEqual(actualValue, expectedValue);
    });
  });
  describe("showDisplay", function() {
    it("should return console.log if there is not error", function() {
      const result = { content: "", isErr: false };

      assert.deepStrictEqual(showResult(result), console.log);
    });

    it("should return console.error if there is error", function() {
      const result = { content: "", isErr: true };

      assert.deepStrictEqual(showResult(result), console.error);
    });
  });

  describe("head", function() {
    it("should return error message if file is not present", function() {
      const args = ["somePath"];

      const doesExists = function(path) {
        assert.notEqual(path, "path");
        return false;
      };

      const reader = function(path, encoder) {};

      const requiredDetails = {
        doesExists: doesExists,
        reader: reader,
        encoder: "utf-8"
      };

      const expectedAns = {
        content: `head: somePath: No such file or directory`,
        isErr: true
      };

      assert.deepStrictEqual(head(args, requiredDetails), expectedAns);
    });

    it("should return array of lines if file contains less no. of line than mentioned in range", function() {
      const args = ["path"];

      const doesExists = function(path) {
        assert.strictEqual(path, "path");
        return true;
      };

      const reader = function(path, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "utf-8");
        return `0\n1\n2\n3\n4\n5`;
      };

      const requiredDetails = {
        doesExists: doesExists,
        reader: reader,
        encoder: "utf-8"
      };

      const expectedAns = { content: `0\n1\n2\n3\n4\n5`, isErr: false };

      assert.deepStrictEqual(head(args, requiredDetails), expectedAns);
    });

    it("should return array of given no. of lines if file contains more lines than mentioned lines", function() {
      const args = ["path"];

      const doesExists = function(path) {
        assert.strictEqual(path, "path");
        return true;
      };

      const reader = function(path, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "utf-8");
        return `0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11`;
      };

      const requiredDetails = {
        doesExists: doesExists,
        reader: reader,
        encoder: "utf-8"
      };

      const expectedAns = {
        content: `0\n1\n2\n3\n4\n5\n6\n7\n8\n9`,
        isErr: false
      };

      assert.deepStrictEqual(head(args, requiredDetails), expectedAns);
    });
  });
});
