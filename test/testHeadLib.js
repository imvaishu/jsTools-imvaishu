const chai = require("chai");
const assert = chai.assert;
const {
  parseUsrOptions,
  joinLines,
  extractUpper10lines,
  head
} = require("../src/headLib");

describe("utils", function() {
  describe("parseUsrOptions", function() {
    it("should parse commandLine arguments if only filename is given", function() {
      const args = ["one.txt"];
      const actualValue = parseUsrOptions(args);
      const expectedValue = {
        fileName: "one.txt",
        end: 10
      };

      assert.deepStrictEqual(actualValue, expectedValue);
    });
  });

  describe("joinLines", function() {
    it("should return head of file by joining with \n", function() {
      const contentOfFile = ["0", "1", "2", "3", "4", "5"];
      const expectedAns = `0\n1\n2\n3\n4\n5`;

      assert.deepStrictEqual(joinLines(contentOfFile), expectedAns);
    });
  });

  describe("extractUpper10Lines", function() {
    it("should return given no.of lines", function() {
      const requireProperties = {
        fileName: "something",
        end: 10
      };

      const content = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      const expectedAns = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      assert.deepStrictEqual(
        extractUpper10lines(requireProperties, content, []),
        expectedAns
      );
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

      const expectedAns = [`head: somePath: No such file or directory`];

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

      const expectedAns = ["0", "1", "2", "3", "4", "5"];

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

      const expectedAns = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      assert.deepStrictEqual(head(args, requiredDetails), expectedAns);
    });
  });
});