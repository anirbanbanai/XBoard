const footerService = require ("../../services/v1/Footer.service")


exports.getFooter = async (req, res, next) => {
    try {
      await footerService.getFooter(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      console.log(`Route: ${req.url} || Method: ${req.method}`);
    }
  };
exports.createFooter = async (req, res, next) => {
    try {
      await footerService.createFooter(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      console.log(`Route: ${req.url} || Method: ${req.method}`);
    }
  };
exports.updateFooter = async (req, res, next) => {
    try {
      await footerService.updateFooter(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      console.log(`Route: ${req.url} || Method: ${req.method}`);
    }
  };
exports.deleteFooter = async (req, res, next) => {
    try {
      await footerService.deleteFooter(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      console.log(`Route: ${req.url} || Method: ${req.method}`);
    }
  };